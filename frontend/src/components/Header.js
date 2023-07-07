import { Link, useLocation } from "react-router-dom";
import headerLogo from "../images/header-logo.svg";

// Объявление функционального компонента Header с двумя пропсами: onSignOut и email
function Header({ onSignOut, email }) {
  // Используем хук useLocation, чтобы получить текущий путь URL
  const location = useLocation();

  // Возвращаем разметку c различным содержанием в зависимости от текущего пути URL
  return (
    <header className="header">
      <img src={headerLogo} alt="Логотип" className="header__logo" />
      {/* Если мы на главной странице ("/"), отображаем email пользователя и кнопку выхода */}
      {location.pathname === "/" && (
        <div className="header__user-info">
          <p className="header__user-email">{email}</p>
          <button className="header__link" onClick={onSignOut}>
            Выйти
          </button>
        </div>
      )}
      {/* Если мы на странице входа ("/sign-in"), отображаем ссылку на страницу регистрации */}
      {location.pathname === "/sign-in" && (
        <Link to="/sign-up" className="header__link">
          Регистрация
        </Link>
      )}
      {/* Если мы на странице регистрации ("/sign-up"), отображаем ссылку на страницу входа */}
      {location.pathname === "/sign-up" && (
        <Link to="/sign-in" className="header__link">
          Войти
        </Link>
      )}
    </header>
  );
}

export default Header;
