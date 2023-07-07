import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Создаем компонент, который принимает дочерние элементы и статус входа в систему
function ProtectedRoute({ children, loggedIn }) {
  // Используем хук useNavigate, чтобы получить функцию для перехода между маршрутами
  const navigate = useNavigate();

  // Используем хук useEffect для выполнения действий при изменении состояния loggedIn, если пользователь не в системе (loggedIn = false), происходит переадресация на страницу входа
  useEffect(() => {
    if (!loggedIn) {
      navigate("/sign-in");
    }
  }, [loggedIn, navigate]);

  // Если пользователь в системе (loggedIn = true), возвращаем дочерние элементы, иначе возвращаем null, что означает, что ничего не будет отрендерено
  return loggedIn ? children : null;
}

export default ProtectedRoute;
