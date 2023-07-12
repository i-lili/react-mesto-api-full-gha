class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl; // Базовый URL API
    this._headers = options.headers; // Заголовки запросов
  }

  setAuthToken(token) {
    this._headers.authorization = `Bearer ${token}`; // Установка токена авторизации в заголовки запросов
  }

  async _getJson(res) {
    if (res.ok) {
      return await res.json(); // Получение JSON из ответа, если запрос выполнен успешно
    }
    throw new Error(`Ошибка: ${res.status}`); // Возникла ошибка, выбрасываем исключение с описанием статуса ошибки
  }

  // Получение списка карточек
  async getCardList() {
    const res = await fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
    return this._getJson(res);
  }

  // Получение информации о текущем пользователе
  async getUserInfo() {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
    return this._getJson(res);
  }

  // Изменение информации о текущем пользователе
  async editUserInfo(data) {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
    return this._getJson(res);
  }

  // Добавление новой карточки
  async addCard(data) {
    const res = await fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    });
    return this._getJson(res);
  }

  // Удаление карточки
  async deleteCard(cardId) {
    const res = await fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
    return this._getJson(res);
  }

  // Изменение статуса лайка карточки
  async changeLikeCardStatus(cardId, isLiked) {
    const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: this._headers,
    });
    return this._getJson(res);
  }

  // Обновление аватара пользователя
  async updateAvatar(avatar) {
    const res = await fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    });
    return this._getJson(res);
  }
}

const api = new Api({
  baseUrl: "https://api.lilaismailova.nomoreparties.sbs", // Базовый URL сервера API
  headers: {
    authorization: `Bearer ${localStorage.getItem('jwt')}`, // Токен авторизации из локального хранилища
    "Content-Type": "application/json", // Тип контента для запросов
  },
});

export default api;
