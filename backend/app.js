require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
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

// Указываем порт и ссылку на БД с помощью переменных окружения
const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Устанавливаем лимит запросов
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100, // каждый IP ограничивается 100 запросами за окно времени
});

app.use(helmet()); // Подключаем helmet для обеспечения безопасности
app.use(limiter); // Включаем ограничение запросов
app.use(express.json()); // Парсим JSON из тела запроса
app.use(cors); // Обрабатываем CORS-заголовки
app.use(requestLogger); // Подключаем логгер запросов

app.post('/signup', validateUser, createUser); // Маршрут для регистрации нового пользователя
app.post('/signin', validateLogin, login); // Маршрут для авторизации пользователя

// Краш-тест сервера
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(auth); // Проводим аутентификацию пользователя
app.use('/users', usersRouter); // Маршрут для работы с пользователями
app.use('/cards', cardsRouter); // Маршрут для работы с карточками

// Если ни один из маршрутов не сработал, то сработает это:
app.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

app.use(errorLogger); // Подключаем логгер ошибок

app.use(errors()); // Обрабатываем ошибки celebrate

// Централизованный обработчик ошибок
app.use(errorHandler);

app.listen(PORT); // Запускаем сервер на указанном порту
