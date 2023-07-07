import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import * as auth from "../utils/auth";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import api from "../utils/Api";
import "../index.css";

// Основной компонент приложения
function App() {
  const navigate = useNavigate();

  // Состояние для выбранной карточки
  const [selectedCard, setSelectedCard] = useState(null);
  // Объявление состояний для открытия и закрытия попапов (true - открыт, false - закрыт)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  // Состояние для данных текущего пользователя
  const [currentUser, setCurrentUser] = useState(null);
  // Состояние для списка карточек
  const [cards, setCards] = useState([]);
  // Состояние для проверки авторизации пользователя
  const [loggedIn, setLoggedIn] = useState(false);
  // Состояние для отображения успешного/неуспешного результата
  const [isSuccess, setIsSuccess] = useState(false);
  // Состояние для email пользователя
  const [email, setEmail] = useState("");
  // Состояние для отображения состояния загрузки
  const [isLoading, setIsLoading] = useState(true);

  // Обработчик выхода пользователя из системы
  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("loggedIn"); // Удаляем значение из localStorage
    localStorage.removeItem("email");
    setEmail("");
    setLoggedIn(false);
  };

  // Функция для открытия попапа редактирования аватара
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  // Функция для открытия попапа редактирования профиля
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  // Функция для открытия попапа добавления нового места
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  // Функция для закрытия всех попапов и сброса выбранной карточки
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipPopupOpen(false);
  };

  // Функция для обработки клика на карточку
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  useEffect(() => {
    // Получение информации о пользователе с сервера
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    // Получение списка карточек с сервера
    api
      .getCardList()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // Функция для обработки лайка и дизлайка карточки
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // Отправляем запрос на сервер для изменения статуса лайка на карточке
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleCardDelete(card) {
    // Отправляем запрос на сервер для удаления карточки
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const handleUpdateUser = (userInfo) => {
    // Отправляем запрос на сервер для обновления информации о пользователе
    api
      .editUserInfo(userInfo)
      .then((updatedUserInfo) => {
        setCurrentUser(updatedUserInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleUpdateAvatar = (newAvatar) => {
    api
      // Отправляем запрос на сервер для обновления аватара пользователя
      .updateAvatar(newAvatar.avatar)
      .then((updatedUserInfo) => {
        setCurrentUser(updatedUserInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleAddPlaceSubmit = (newPlace) => {
    api
      // Отправляем запрос на сервер для добавления новой карточки
      .addCard(newPlace)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Функция для регистрации пользователя
  const handleRegister = (email, password) => {
    auth
      .register(email, password)
      .then((data) => {
        if (data) {
          setEmail(email); // Обновляем email
          setIsInfoTooltipPopupOpen(true);
          setIsSuccess(true);
          navigate("/sign-in");
        }
      })
      .catch((error) => {
        setIsInfoTooltipPopupOpen(true);
        setIsSuccess(false);
        console.log(error);
      });
  };

  // Функция для авторизации пользователя
  const handleLogin = (email, password) => {
    auth
      .login(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("email", email);
          setEmail(email);
          setLoggedIn(true);
          navigate("/");
        }
      })
      .catch((error) => {
        setIsInfoTooltipPopupOpen(true);
        setIsSuccess(false);
        console.log(error);
      });
  };

  // Функция для проверки токена
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    const storedEmail = localStorage.getItem("email");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setEmail(storedEmail);
            setLoggedIn(true);
            navigate("/");
          }
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  return isLoading ? (
    <div>Загрузка...</div> // Отображение сообщения о загрузке
  ) : (
    // Обертка корневого компонента в провайдер контекста
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__container">
        <div className="page">
          <Header onSignOut={handleSignOut} email={email} loggedIn={loggedIn} />{" "}
          <Routes>
            <Route
              path="/sign-up"
              element={<Register onRegister={handleRegister} />}
            ></Route>
            <Route
              path="/sign-in"
              element={<Login onLogin={handleLogin} />}
            ></Route>
            <Route
              path="/"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <Main
                    // передаем функции-обработчики событий в компонент Main
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    cards={cards}
                    setCards={setCards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                  />
                  {loggedIn && <Footer />}
                </ProtectedRoute>
              }
            ></Route>
          </Routes>
          {/* popups */}
          {/* avatar-popup */}
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          {/* edit-popup */}
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          {/* add-popup */}
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          {/* delete-popup */}
          <PopupWithForm
            title="Вы уверены?"
            name="delete"
            id="delete-popup"
            onClose={closeAllPopups}
            buttonText="Да"
          ></PopupWithForm>
          {/* image-popup */}
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          {/* info-popup */}
          <InfoTooltip
            isOpen={isInfoTooltipPopupOpen}
            onClose={closeAllPopups}
            isSuccess={isSuccess}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
