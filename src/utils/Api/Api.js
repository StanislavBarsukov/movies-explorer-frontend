class Api {
  constructor(data) {
    this._url = data.url;
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  getUser() {
    return fetch(`${this._url}/users/me`, {
      method:"GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      }
    }).then(this._checkResponse);
  }

  updateUser(email, name) {
    return fetch(`${this._url}/users/me`, {
      method:"PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        name: name,
      })
    }).then(this._checkResponse);
  }

}

const api = new Api({
  url: "http://localhost:3002",
});

export default api;
