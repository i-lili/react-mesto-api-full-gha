import React, { useEffect } from "react";

function ImagePopup({ card, onClose }) {
  // Обработчик клика на оверлей попапа
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("popup_is-opened")) {
      onClose();
    }
  };

  // useEffect для добавления и удаления обработчика нажатия клавиши Esc
  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    // Если объект card существует, добавляем обработчик события keydown для закрытия модального окна по клавише Esc
    if (card) {
      document.addEventListener("keydown", handleEscClose);
    }

    // Возвращаем функцию-обработчик cleanup для удаления обработчика нажатия клавиши Esc при размонтировании компонента
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [card, onClose]);

  return (
    <section
      className={`popup ${card ? "popup_is-opened" : ""}`}
      id="image-popup"
      onClick={handleOverlayClick}
    >
      <figure className="popup__image-container">
        <img className="popup__image" src={card?.link} alt={card?.name} />
        <figcaption className="popup__caption">{card?.name}</figcaption>
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
        ></button>
      </figure>
    </section>
  );
}

export default ImagePopup;
