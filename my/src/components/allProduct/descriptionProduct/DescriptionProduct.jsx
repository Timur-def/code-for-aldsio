import { useLocation } from "react-router-dom";

export default function DescriptionProduct() {
  const location = useLocation();
  const { description } = location.state || {}; // Получаем описание из state

  return (
    <div>
      <h2>Описание продукта</h2>
      {description ? (
        <p>{description}</p>
      ) : (
        <p>Описание не доступно</p>
      )}
    </div>
  );
}