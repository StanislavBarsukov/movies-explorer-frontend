class Api {
  constructor(data) {
    this._url = data.url;
    this._headers = data.headers
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

}

const api = new Api({
  url: "http://localhost:3002",
});

export default api;
