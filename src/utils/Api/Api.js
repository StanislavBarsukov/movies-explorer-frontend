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
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      }
    }).then(this._checkResponse);
  }

  updateUser(email, name) {
    return fetch(`${this._url}/users/me`, {
      method:"PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        name: name,
      })
    }).then(this._checkResponse);
  }

  getMoviesSave() {
    return fetch(`${this._url}/movies`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      },
    })
      .then(this._checkResponse);
  }

  saveMovie(movie) {
    return fetch(`${this._url}/movies`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `https://api.nomoreparties.co${movie.image.url}` || "",
        trailerLink: movie.trailerLink,
        thumbnail: `https://api.nomoreparties.co${movie.image.url}` || "",
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      })
    })
      .then(this._checkResponse)
  }

  deleteMovie(id) {
    return fetch(`${this._url}/movies/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      },
    })
      .then(this._checkResponse)
  };
}

const api = new Api({
  url: "http://localhost:3004",
});

export default api;
