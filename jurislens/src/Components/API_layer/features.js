const URL = 'http://127.0.0.1:8000/';

export const lookupIpc = (query) => {
  console.log(query)
  console.log(`${URL}lookUp/${query}`)
  return fetch(`${URL}lookUp/${query}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(data => {
        console.log(data.detail || data);
        throw new Error(data.detail || 'Failed to fetch');
      });
    }
    return response.json();
  })
  .then(data => {
    return data;
  })
  .catch(error => {
    throw new Error(error.message || 'Failed to fetch');
  });
};


export const caseRelevance = (scenario, ipcsections) => {
  const queryParams = new URLSearchParams({
    query: scenario,
    sections: ipcsections 
  });

  const url = `${URL}caseRelevance/?${queryParams}`;

  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(data => {
        console.log(data.detail || data);
        throw new Error(data.detail || 'Failed to fetch');
      });
    }
    return response.json();
  })
  .catch(error => {
    throw new Error(error.message || 'Failed to fetch');
  });
};


export const simCases = (query) => {
  console.log(query)
  console.log(`${URL}simCases/${query}`)
  return fetch(`${URL}simCases/${query}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(data => {
        console.log(data.detail || data);
        throw new Error(data.detail || 'Failed to fetch');
      });
    }
    return response.json();
  })
  .catch(error => {
    throw new Error(error.message || 'Failed to fetch');
  });
};

