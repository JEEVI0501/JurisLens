import React from 'react';
import home1 from '../../assets/home1.jpeg';
import { Grid,Button, Card,CardContent, CardMedia } from '@mui/material';
import './Home.css'
const blog =[
  {image:'https://miro.medium.com/v2/resize:fit:1400/format:webp/1*umAHwvtGaH8ExhTwelucrQ.jpeg',
   description:'The Indian Constitution came into force on 26th January 1950. At the time it was been adopted, the Constitution contained 395 Articles and 8 Schedules and about 145,000 words, hence making it the longest written constitution in the world. ',
   link:'https://medium.com/abstract-publication/strange-and-funny-laws-in-india-7f2a689a6437',
   heading:'Interesting Laws In India'
},
  {image:'https://miro.medium.com/v2/resize:fit:1400/format:webp/1*uLZaAc6LyZJFYRDUeRo3Eg.png',
   heading:'UNDERSTANDING THE BASIC KNOWLEDGE OF LAWS IN INDIA ',
   link:'https://medium.com/@wordpressuser899/basic-laws-in-india-understanding-the-basic-knowledge-of-laws-in-india-6244c8a5b6dd',
   description:'As an attorney, it is my responsibility to ensure that everyone understands basic knowledge of laws in India. In this article, we will examine some of the important laws that affect our daily lives.'
},

]
export default function Home() {
  return (
    <>
    <div style={{ marginTop: '80px', position: 'relative' }}>
      <img
        src={home1}
        style={{ width: '100%', height: '780px' }}
        alt="Home"
      />
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        color: 'white',
      }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold' }}>Find. Analyse. Judge</h1>
        <h4 style={{ fontSize: '1.5rem',  fontWeight: 'bold' }}>
          The more the laws, less the justice
        </h4>
        <button style={{ marginTop: '20px', padding: '10px 20px', fontSize: '1.2rem', backgroundColor: 'rgba(255, 255, 255, 0.5)', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Contact Us</button>
      </div>
      </div>
      <div style={{ marginTop: '30px' }}>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <div>
              <h3 style={{color:'#C2C266'}}>About Us</h3>
              <h1 style={{color:'#4e6c8d'}}>Welcome to Juris Lens</h1>
            </div>
            <p>At Juris Lens, we are dedicated to providing users with easy access to the intricate world of Indian Penal Code 
              (IPC) sections. Our platform serves as a comprehensive repository where users can effortlessly search for any crime and 
              find relevant legal provisions. Additionally, through compelling case studies, we illustrate 
              real-world scenarios, highlighting the judgments delivered and providing insights into what should have ideally transpired.
               Join us in our mission</p>
            <Button variant="contained" className='contactUs'>Contact Us</Button>
          </CardContent>
        </Card>
        <Card sx={{ maxWidth: 345 }}>
               <a href={blog[0].link} target="_blank" className="blogLink">    
              <CardMedia
                component="img"
                height="200"
                image={blog[0].image}
              />
              <CardContent>
                <p className="blogHeading">{blog[0].heading}</p>

                <p className="blogSubHead">
                  {blog[0].description.split(" ").slice(0, 30).join(" ")}
                  ...
                </p>
              </CardContent>
            </a>   
        </Card>
                <Card sx={{ maxWidth: 345 }}>
               <a href={blog[1].link} target="_blank" className="blogLink">    
              <CardMedia
                component="img"
                height="200"
                image={blog[1].image}
              />
              <CardContent>
                <p className="blogHeading">{blog[1].heading}</p>

                <p className="blogSubHead">
                  {blog[1].description.split(" ").slice(0, 30).join(" ")}
                  ...
                </p>
              </CardContent>
            </a>   
        </Card>
      </div>
    </div>
    
    </>
  )
}
