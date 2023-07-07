import React from "react";
import Popup from "./Popup";
import SuccessIcon from "../images/success-icon.svg";
import ErrorIcon from "../images/error-icon.svg";

// Компонент модального окна,который информирует пользователя об успешной (или не очень) регистрации
function InfoTooltip({ isOpen, onClose, isSuccess }) {
  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <button type="button" className="popup__close" onClick={onClose}></button>
      {isSuccess ? (
        <>
          <img src={SuccessIcon} alt="success" className="auth__tooltip-icon" />
          <p className="auth__tooltip-text">Вы успешно зарегистрировались!</p>
        </>
      ) : (
        <>
          <img src={ErrorIcon} alt="error" className="auth__tooltip-icon" />
          <p className="auth__tooltip-text">
            Что-то пошло не так! Попробуйте ещё раз.
          </p>
        </>
      )}
    </Popup>
  );
}

export default InfoTooltip;
