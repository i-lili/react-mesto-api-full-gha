import React, { useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Input from "./Input";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  // Получение текущего пользователя из контекста
  const currentUser = useContext(CurrentUserContext);

  // Инициализация хука формы и валидации
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  // Сброс формы при изменении текущего пользователя или открытии модального окна
  useEffect(() => {
    if (currentUser && isOpen) {
      resetForm({
        name: currentUser.name,
        about: currentUser.about,
      });
    }
  }, [currentUser, isOpen, resetForm]);

  // Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();
    // Вызываем функцию обновления данных пользователя
    onUpdateUser({
      name: values.name,
      about: values.about,
    });
  };

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit"
      id="edit-popup"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <Input
        type="text"
        id="name"
        className="popup__input popup__input_item_name"
        name="name"
        placeholder="Жак-Ив Кусто"
        minLength="2"
        maxLength="40"
        required
        value={values.name || ""}
        onChange={handleChange}
      />
      <span id="name-error" className="popup__error">
        {errors.name}
      </span>
      <Input
        type="text"
        id="about"
        className="popup__input popup__input_item_about"
        name="about"
        placeholder="Исследователь океана"
        minLength="2"
        maxLength="200"
        required
        value={values.about || ""}
        onChange={handleChange}
      />
      <span id="about-error" className="popup__error">
        {errors.about}
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
