import React from "react";
import AuthForm from "./AuthForm";

function Login({ onLogin }) {
  return (
    // Отрисовка формы аутентификации с передачей соответствующих параметров
    <AuthForm 
      title="Вход" 
      buttonText="Войти" 
      onSubmitAction={onLogin} 
    />
  );
}

export default Login;
