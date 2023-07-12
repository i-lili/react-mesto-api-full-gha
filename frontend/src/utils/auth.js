export const BASE_URL = "https://api.lilaismailova.nomoreparties.sbs"; // Базовый URL сервера

// Функция для проверки ответа сервера
async function checkResponse(response) {
  if (response.ok) {
    return await response.json(); // Возвращает JSON из ответа, если запрос выполнен успешно
  } else {
    throw new Error(`Ошибка: ${response.status}`); // Возникла ошибка, выбрасывает исключение с описанием статуса ошибки
  }
}

// Функция для регистрации пользователя
export const register = async (email, password) => {
  const response = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return checkResponse(response);
};

// Функция для авторизации пользователя
export const login = async (email, password) => {
  const response = await fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return checkResponse(response);
};

// Функция для проверки токена авторизации и получения данных пользователя
export const checkToken = async (token) => {
  const response = await fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return checkResponse(response);
};
