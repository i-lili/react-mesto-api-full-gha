export const BASE_URL = "https://auth.nomoreparties.co";

// Функция для проверки ответа сервера
function checkResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error(`Ошибка: ${response.status}`);
  }
}

// Функция принимает адрес электронной почты и пароль, а затем отправляет запрос на сервер для регистрации пользователя с этими данными
export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

// Функция для авторизации пользователя
export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

// Функция принимает токен и отправляет запрос на сервер, чтобы проверить, действителен ли токен
// Если токен действителен, сервер вернет данные пользователя
export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};
