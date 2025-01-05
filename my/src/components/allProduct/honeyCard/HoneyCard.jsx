import "./HoneyCard.scss";
import { Link } from "react-router-dom";
import AddCartButton from "../addCartButton/AddCartButton";
import dateProduct from "../dateProduct.json";

export default function HoneyCard() {
  return (
    <>
      {dateProduct.PRODUCT.map((data) => {
        return (
          <div className="card">
            <Link
              className="card__photoProduct"
              to={"/descriptionProduct"}
              state={{ data }} // Передаем описание в state
            >
              <img
                src={data.image}
                className="card__photoProduct"
                alt={data.title}
              />
            </Link>
            <div className="card__text">
              <h3 className="card__price">{data.price}₽</h3>
              <p className="card__title">{data.title}</p>
              <AddCartButton className="card__btn" />
            </div>
          </div>
        );
      })}
    </>
  );
}
