require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { login, createUser } = require('./controllers/users');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const errorHandler = require('./middlewares/errorHandler');
const auth = require('./middlewares/auth');
const { validateUser, validateLogin } = require('./middlewares/validation');
const { NotFoundError } = require('./errors/Errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

const app = express();
const port = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json()); // Парсинг JSON из тела запроса
app.use(cors); // Обработка CORS-заголовков
app.use(requestLogger); // Подключение логгера запросов

app.post('/signup', validateUser, createUser); // Маршрут для регистрации нового пользователя
app.post('/signin', validateLogin, login); // Маршрут для входа пользователя

// Краш-тест сервера
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(auth); // Проверка аутентификации пользователя
app.use('/users', usersRouter); // Маршрут для работы с пользователями
app.use('/cards', cardsRouter); // Маршрут для работы с карточками

// Если ни один из маршрутов не сработал, то сработает это:
app.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

app.use(errorLogger); // Подключение логгера ошибок

app.use(errors()); // Обработчик ошибок celebrate

// Централизованный обработчик ошибок
app.use(errorHandler);

app.listen(port); // Запуск сервера на указанном порту
