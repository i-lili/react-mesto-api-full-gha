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

  // Функция для получения данных пользователя
  const fetchUserData = async (jwt) => {
    api.setAuthToken(jwt); // устанавливаем токен для API
  
    try {
      const userData = await api.getUserInfo();
      setCurrentUser(userData);
  
      const cardsData = await api.getCardList();
      setCards(cardsData);
    } catch (err) {
      console.error(err);
    }
  };

// Функция для обработки лайка и дизлайка карточки
async function handleCardLike(card) {
  const isLiked = card.likes.some((id) => id === currentUser._id);
  // Отправляем запрос на сервер для изменения статуса лайка на карточке
  try {
    const newCard = await api.changeLikeCardStatus(card._id, !isLiked);
    setCards((state) =>
      state.map((c) => (c._id === card._id ? newCard : c))
    );
  } catch (err) {
    console.error(err);
  }
}

async function handleCardDelete(card) {
  // Отправляем запрос на сервер для удаления карточки
  try {
    await api.deleteCard(card._id);
    setCards((state) => state.filter((c) => c._id !== card._id));
  } catch (err) {
    console.error(err);
  }
}

  // Функция для обновления данных пользователя
  const handleUpdateUser = async (userInfo) => {
    try {
      const updatedUserInfo = await api.editUserInfo(userInfo);
      setCurrentUser(updatedUserInfo);
      closeAllPopups();
    } catch (err) {
      console.error(err);
    }
  };

  // Функция для обновления аватара пользователя
  const handleUpdateAvatar = async (newAvatar) => {
    try {
      const updatedUserInfo = await api.updateAvatar(newAvatar.avatar);
      setCurrentUser(updatedUserInfo);
      closeAllPopups();
    } catch (err) {
      console.error(err);
    }
  };

  // Функция для добавления новой карточки
  const handleAddPlaceSubmit = async (newPlace) => {
    try {
      const newCard = await api.addCard(newPlace);
      setCards([newCard, ...cards]);
      closeAllPopups();
    } catch (err) {
      console.error(err);
    }
  };

const handleRegister = async (email, password) => {
    try {
      const data = await auth.register(email, password);
      if (data) {
        // После регистрации показываем попап об успешной регистрации
        setIsInfoTooltipPopupOpen(true);
        setIsSuccess(true);
        navigate("/sign-in");
      } 
    } catch (error) {
      setIsInfoTooltipPopupOpen(true);
      setIsSuccess(false);
      console.log(error);
    }
  };

  
  const handleLogin = async (email, password) => {
    try {
      const data = await auth.login(email, password);
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        localStorage.setItem("email", email);
        setEmail(email);
        navigate("/");
        fetchUserData(data.token);
        setLoggedIn(true);
      }
    } catch (error) {
      setIsInfoTooltipPopupOpen(true);
      setIsSuccess(false);
      console.log(error);
    }
  };
  
  useEffect(() => {
    (async () => {
      const jwt = localStorage.getItem("jwt");
      const storedEmail = localStorage.getItem("email");
      if (jwt) {
        try {
          const res = await auth.checkToken(jwt);
          if (res) {
            setEmail(storedEmail);
            setLoggedIn(true);
            fetchUserData(jwt);
            navigate("/");
          }
          setIsLoading(false);
        } catch (err) {
          console.log(err);
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    })();
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
