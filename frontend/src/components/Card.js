import React, { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

// Создаем функциональный компонент Card, который принимает объект card и функцию onCardClick
function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  // Получаем объект текущего пользователя из контекста
  const currentUser = useContext(CurrentUserContext);

  // Проверяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;
  // Проверяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__like ${
    isLiked && "element__like_active"
  }`;

  // Функция для обработки клика по изображению карточки
  const handleClick = () => {
    onCardClick(card);
  };

  // Функция для обработки клика по кнопке лайка
  const handleLikeClick = () => {
    onCardLike(card);
  };

  // Функция для обработки клика по кнопке удаления карточки
  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  // Функция для обработки ошибки загрузки изображения карточки
  const handleImageError = (event) => {
    event.target.src =
      "https://via.placeholder.com/282x282.png?text=Image+not+found";
  };

  // Возвращаем JSX разметку для карточки
  return (
    <article className="element">
      <img
        className="element__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
        onError={handleImageError}
      />
      {isOwn && (
        <button
          type="button"
          className="element__trash"
          aria-label="Удалить"
          onClick={handleDeleteClick}
        ></button>
      )}
      <div className="element__wrapper">
        <h2 className="element__name">{card.name}</h2>
        <div>
          <button
            type="button"
            className={cardLikeButtonClassName}
            aria-label="Лайк"
            onClick={handleLikeClick}
          ></button>
          <p className="element__like-count">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
