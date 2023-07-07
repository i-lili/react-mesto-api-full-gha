import React from "react";

// Создание формы с обработчиком onSubmit и передачей props, отображение дочерних элементов внутри формы
function Form({ children, onSubmit, ...props }) {
  return (
    <form onSubmit={onSubmit} {...props}>
      {children}
    </form>
  );
}

export default Form;
