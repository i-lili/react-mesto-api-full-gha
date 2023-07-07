import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "./Form";
import Input from "./Input";

// Компонент формы авторизации и регистрации
function AuthForm({
  title,
  buttonText,
  alternativeText,
  alternativeLink,
  onSubmitAction,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmitAction(email, password);
  };

  return (
    <section className="auth">
      <h2 className="auth__title">{title}</h2>
      <Form onSubmit={handleSubmit} className="auth__form">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="auth__input"
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Пароль"
          required
          className="auth__input"
        />
        <button type="submit" className="auth__submit-button">
          {buttonText}
        </button>
        {alternativeText && alternativeLink && (
          <p className="auth__alternative">
            {alternativeText}{" "}
            <Link to={alternativeLink} className="auth__alternative-link">
              {buttonText}
            </Link>
          </p>
        )}
      </Form>
    </section>
  );
}

export default AuthForm;
