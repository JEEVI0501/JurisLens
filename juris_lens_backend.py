from sqlalchemy import create_engine
from databases import Database
from sqlalchemy import Column, Integer, String, MetaData, Table
from pydantic import BaseModel
from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import sessionmaker
from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import JWTError, jwt
import secrets
from sentence_transformers import SentenceTransformer
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
import pandas as pd
import math
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

DATABASE_URL = "sqlite:///./test.db"
database = Database(DATABASE_URL)
engine = create_engine(DATABASE_URL)
metadata = MetaData()
metadata.create_all(engine)
SECRET_KEY = secrets.token_urlsafe(32)
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

model = SentenceTransformer("distilbert-base-nli-mean-tokens")
import pandas as pd

df = pd.read_csv("devgan_ipc_fill_na.csv")
ipc_embeddings = model.encode(df["Description"])


class UserCreate(BaseModel):
    email: str
    password: str


class User(BaseModel):
    email: str


class UserInDB(User):
    hashed_password: str


users = Table(
    "users",
    metadata,
    Column("id", Integer, primary_key=True, index=True),
    Column("email", String, unique=True, index=True),
    Column("hashed_password", String),
)


app = FastAPI()

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup():
    await database.connect()
    metadata.create_all(engine)


@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


pwd_context = CryptContext(schemes=["sha256_crypt"], deprecated="auto")


def get_password_hash(password):
    return pwd_context.hash(password)


def create_access_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


@app.post("/signup/", response_model=User)
async def signup(user: UserCreate, db=Depends(get_db)):
    hashed_password = get_password_hash(user.password)
    query = users.insert().values(email=user.email, hashed_password=hashed_password)
    try:
        print(query)
        result = db.execute(query)
        db.commit()
        return {"email": user.email}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Internal Server Error")


@app.get("/lookUp/{query}")
def lookUp(query: str):
    ipc_sections = df["IPC_Section"].tolist()
    descriptions = df["Description"].tolist()
    offense = df["Offense"].tolist()
    punishment = df["Punishment"].tolist()
    cognizable = df["Cognizable"].tolist()
    bailable = df["Bailable"].tolist()
    corpus = descriptions

    corpus = descriptions + [query]
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(corpus)
    query_tfidf_vector = tfidf_matrix[-1]
    document_tfidf_matrix = tfidf_matrix[:-1]
    similarities = cosine_similarity(query_tfidf_vector, document_tfidf_matrix)

    res = []
    for i, sim in enumerate(similarities[0]):
        res.append(
            [
                ipc_sections[i],
                descriptions[i],
                sim,
                bailable[i],
                offense[i],
                punishment[i],
                cognizable[i],
            ]
        )
    res = sorted(res, key=lambda x: x[2], reverse=True)
    print(res[:10])
    return res[:10]


from rank_bm25 import BM25Okapi
import pandas as pd


@app.get("/simCases/{query}")
def simCases(query: str):
    df = pd.read_csv("synthetic_crime_data.csv")
    documents = []
    for index, row in df.iterrows():
        concatenated_str = ",".join(row.astype(str))
        documents.append(concatenated_str)
    tokenized_docs = [doc.lower().split() for doc in documents]
    # Initialize BM25 object
    bm25 = BM25Okapi(tokenized_docs)

    # Tokenize query
    query_tokens = query.lower().split()

    # Get BM25 scores for the query
    bm25_scores = bm25.get_scores(query_tokens)

    sorted_docs = sorted(
        zip(df.values.tolist(), bm25_scores), key=lambda x: x[1], reverse=True
    )[:10]

    # Create DataFrame from sorted documents
    res_df = pd.DataFrame(
        [doc + [score] for doc, score in sorted_docs],
        columns=list(df.columns) + ["Score"],
    )

    # Convert DataFrame to JSON
    json_data = res_df.to_json(orient="records")
    print(json_data)
    return json_data


from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


@app.get("/caseRelevance/")
def case_relevance(query: str = Query(...), sections: str = Query(...)):
    print(query)
    print(sections)

    query_embedding = model.encode(query)
    similarities = cosine_similarity([query_embedding], ipc_embeddings)
    ranked_sections_indices = similarities.argsort()[0][::-1]
    user_sections = sections.split(",")
    top_k = len(user_sections)
    top_sections = df.iloc[ranked_sections_indices[:top_k]]
    print("Top-ranked IPC Sections:")
    for idx, row in top_sections.iterrows():
        print(f"IPC Section: {row['IPC_Section']}")
        print(f"Description: {row['Description']}")
        print()
    ls = []
    n = len(df)
    section = df["IPC_Section"].tolist()
    desc = df["Description"].tolist()
    bail = df["Bailable"].tolist()
    for i in range(n):
        if similarities[0][i] > 0.5:
            ls.append([section[i], desc[i], bail[i], similarities[0][i]])
    sort_ls = sorted(ls, key=lambda x: x[1], reverse=True)

    model_para = ""
    for i in desc:
        model_para += " " + i

    user_df = df[df["IPC_Section"].isin(user_sections)]
    user_desc = user_df["Description"].tolist()
    user_para = ""
    for i in user_desc:
        user_para += " " + i
    paragraph1 = model_para
    paragraph2 = user_para
    similarity_score = compute_similarity(paragraph1, paragraph2)
    print("Cosine Similarity:", similarity_score)
    return similarity_score


def compute_similarity(paragraph1, paragraph2):
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform([paragraph1, paragraph2])
    similarity = cosine_similarity(tfidf_matrix[0], tfidf_matrix[1])
    return similarity[0][0]


@app.post("/login/")
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db=Depends(get_db)):
    user = await authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    print(user)
    access_token = create_access_token(
        data={"sub": user[1]}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


async def authenticate_user(db, email: str, password: str):
    query = users.select().where(users.c.email == email)
    result = db.execute(query)
    user = result.fetchone()
    if not user:
        return False
    if not pwd_context.verify(password, user.hashed_password):
        return False
    return user


@app.get("/")
def read_root():
    return {"Hello": "World"}
