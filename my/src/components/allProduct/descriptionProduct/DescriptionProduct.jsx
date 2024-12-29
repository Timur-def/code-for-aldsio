import { useLocation } from "react-router-dom";
import "./DescriptionProduct.scss";
export default function DescriptionProduct() {
  const location = useLocation();
  const {product} = location.state || {}; // Получаем описание из state

  return (
    <div className="cardDescription">
      <h2>Описание продукта</h2>
      <img src={product.image} className="cardDescription__image"/>
      <div className="cardDescription__bottomBlock">
      <h2 className="cardDescription__price">Цена: {product.price}₽</h2>
      {product.description ? (
        <h3 className="cardDescription__Descr">{product.description}</h3>
      ) : (
        <p>Описание не доступно</p>
      )}
      </div>
    </div>
  );
}
