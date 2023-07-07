import React, { useEffect } from "react";
import { useFormAndValidation } from "../hooks/useFormAndValidation";
import PopupWithForm from "./PopupWithForm";
import Input from "./Input";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  // Инициализация хука формы и валидации
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Обновление аватара при отправке формы
    onUpdateAvatar({
      avatar: values.avatar,
    });
  };

  const handleAvatarChange = (e) => {
    // Обработчик изменения значения аватара
    handleChange(e);
  };

  useEffect(() => {
    // Сброс формы при открытии попапа
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <Input
        type="url"
        id="avatar"
        className="popup__input popup__input_item_avatar"
        name="avatar"
        placeholder="Ссылка на аватар"
        required
        value={values.avatar || ""}
        onChange={handleAvatarChange}
      />
      <span id="avatar-error" className="popup__error">
        {errors.avatar}
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
