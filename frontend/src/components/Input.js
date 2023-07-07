import React from "react";

// Создаем компонент, который принимает ref и остальные свойства (props) и передает их внутреннему input элементу
const Input = React.forwardRef((props, ref) => <input ref={ref} {...props} />);

export default Input;
