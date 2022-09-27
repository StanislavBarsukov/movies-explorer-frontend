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
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkResponse);
  }
}

const apiMovies = new ApiMovies({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
});

export default apiMovies;
