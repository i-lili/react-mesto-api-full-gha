import React, { useEffect } from "react";

// Создаем функциональный компонент, который принимает несколько пропсов
function Popup({ isOpen, onClose, children }) {
  useEffect(() => {
    // Обработчик события для нажатия клавиши Escape
    const handleEscPress = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    // Добавляем обработчик события при монтировании компонента
    document.addEventListener("keydown", handleEscPress);
    // Удаляем обработчик события при размонтировании компонента
    return () => {
      document.removeEventListener("keydown", handleEscPress);
    };
  }, [isOpen, onClose]);

  // Обработчик клика по оверлею
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`popup ${isOpen ? "popup_is-opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
        ></button>
        {children}
      </div>
    </div>
  );
}

export default Popup;
