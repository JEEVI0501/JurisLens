const URL = 'http://127.0.0.1:8000/';

export const login = async (email, password) => {
  try {
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);

    const response = await fetch(`${URL}login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.detail || 'Failed to login');
    }
    return data;
  } catch (error) {
    throw new Error(error.message || 'Failed to login');
  }
};


export const signup = async (email, password) => {
  try {
    const response = await fetch(`${URL}signup/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.detail || 'Failed to sign up');
    }
    return data;
  } catch (error) {
    throw new Error(error.message || 'Failed to sign up');
  }
};
