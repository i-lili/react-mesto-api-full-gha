import React from "react";
import Popup from "./Popup";
import Form from "./Form";
import Input from "./Input";

// Создаем функциональный компонент PopupWithForm, который принимает несколько пропсов
function PopupWithForm({
  title,
  isOpen,
  onClose,
  onSubmit,
  children,
  buttonText = "Сохранить",
}) {
  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <h2 className="popup__title">{title}</h2>
      <Form className="popup__form" onSubmit={onSubmit}>
        {children}
        <button type="submit" className="popup__button">
          {buttonText}
        </button>
      </Form>
    </Popup>
  );
}

export default PopupWithForm;
