import React, { useContext } from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({
  // Обработчики событий, переданные в качестве пропсов из App.js
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  // Получаем объект текущего пользователя из контекста
  const currentUser = useContext(CurrentUserContext);

  // Рендерим основной контент страницы с помощью JSX
  return (
    <main className="content">
      {/* profile */}
      <section className="profile">
        <div className="profile__wrapper">
          <div className="profile__avatar-wrapper">
            <img
              className="profile__avatar"
              src={currentUser?.avatar}
              alt="Аватар пользователя"
              style={{ backgroundImage: `url(${currentUser?.avatar})` }}
            />
            <button
              type="button"
              className="profile__avatar-edit-button"
              onClick={onEditAvatar}
            ></button>
          </div>
          <div className="profile__info">
            <div className="profile__inner-wrapper">
              <h1 className="profile__name">{currentUser?.name}</h1>
              <button
                type="button"
                className="profile__edit-button"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__about">{currentUser?.about}</p>
          </div>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        ></button>
      </section>
      {/* elements */}
      <section className="elements">
        {cards.map((card) => (
          // Для каждой карточки создаем компонент Card с уникальным ключом и передаем данные карточки и обработчик клика
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
