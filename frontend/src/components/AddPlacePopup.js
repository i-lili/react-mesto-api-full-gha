import React, { useEffect } from "react";
import { useFormAndValidation } from "../hooks/useFormAndValidation";
import PopupWithForm from "./PopupWithForm";
import Input from "./Input";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  // Инициализация хука формы и валидации
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace({
      name: values.title,
      link: values.link,
    });
  };

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  return (
    <PopupWithForm
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Создать"
    >
      <Input
        type="text"
        id="title"
        className="popup__input popup__input_item_title"
        name="title"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        value={values.title || ""}
        onChange={handleChange}
      />
      <span id="title-error" className="popup__error">
        {errors.title}
      </span>
      <Input
        type="url"
        id="link"
        className="popup__input popup__input_item_link"
        name="link"
        placeholder="Ссылка на картинку"
        required
        value={values.link || ""}
        onChange={handleChange}
      />
      <span id="link-error" className="popup__error">
        {errors.link}
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
