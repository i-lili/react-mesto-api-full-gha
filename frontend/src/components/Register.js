import React from "react";
import AuthForm from "./AuthForm";

// Компонент Register отвечает за регистрацию пользователя
function Register({ onRegister }) {
  return (
    // Используем AuthForm для отображения формы регистрации
    <AuthForm
      title="Регистрация"
      buttonText="Войти"
      alternativeText="Уже зарегистрированы?"
      alternativeLink="/sign-in"
      onSubmitAction={onRegister}
    />
  );
}

export default Register;
