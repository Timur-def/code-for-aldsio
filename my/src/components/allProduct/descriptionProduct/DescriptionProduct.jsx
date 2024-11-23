import { useLocation } from "react-router-dom";
import "./DescriptionProduct.scss";
export default function DescriptionProduct() {
  const location = useLocation();
  const { description, image } = location.state || {}; // Получаем описание из state

  return (
    <div className="cardDescription">
      <h2>Описание продукта</h2>
      {description ? (
        <h3 className="cardDescription__Descr">{description}</h3>
      ) : (
        <p>Описание не доступно</p>
      )}
      <img src={image} className="cardDescription__image" />
    </div>
  );
}
