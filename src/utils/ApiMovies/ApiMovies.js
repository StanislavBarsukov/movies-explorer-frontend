class ApiMovies {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getMovies() {
    return fetch(`${this._baseUrl}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(this._checkResponse);
  }
}

const apiMovies = new ApiMovies({
  baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
});

export default apiMovies;
