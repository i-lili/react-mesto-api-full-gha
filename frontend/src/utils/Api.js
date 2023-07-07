class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  // Приватный метод для получения ответа от сервера в формате JSON.
  _getJson(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // Метод для получения карточек с сервера.
  getCardList() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._getJson);
  }

  // Метод для получения информации о пользователе с сервера.
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._getJson);
  }

  // Метод для обновления информации о пользователе на сервере.
  editUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._getJson);
  }

  // Метод для добавления новой карточки на сервер.
  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._getJson);
  }

  // Метод для удаления карточки с сервера.
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getJson);
  }

  // Метод для изменения статуса лайка карточки на сервере.
  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: this._headers,
    }).then(this._getJson);
  }

  // Метод для обновления аватара пользователя
  updateAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._getJson);
  }
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-61",
  headers: {
    authorization: "d14f3df3-8e7d-4c23-be34-6e27c8e1960e",
    "Content-Type": "application/json",
  },
});

export default api;