import { useState } from "react";

// Кастомный хук для управления состоянием формы
export function useForm(inputValues) {
  // Инициализация состояния формы
  const [values, setValues] = useState(inputValues);

  // Обработчик изменения значений в полях формы
  const handleChange = (event) => {
    const { value, name } = event.target;
    // Обновление состояния формы с новыми значениями
    setValues({ ...values, [name]: value });
  };

  // Возвращаемые значения: текущее состояние формы, обработчик изменений и функция установки состояния
  return { values, handleChange, setValues };
}
