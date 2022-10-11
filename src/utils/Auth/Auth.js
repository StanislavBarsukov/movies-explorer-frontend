export const BASE_URL = "http://localhost:3004";

const checkResponse = (response) => {
  return response.ok ? response.json() : Promise.reject(response.status);
};

const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json"
};

export const register = (email, password, name) => {
    return fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers,
        body: JSON.stringify({email, password, name})
    })
        .then(checkResponse)
};

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers,
        body: JSON.stringify({email, password})
    })
        .then(checkResponse)
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      headers,
    },
  })
    .then(checkResponse)
};
