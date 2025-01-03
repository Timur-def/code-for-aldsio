import "./HoneyCard.scss";
import { Link, useLocation } from "react-router-dom";
import { useAtom } from "jotai";
import { cartAtom } from "../cartAtom";
import { useState, useEffect } from "react";

export default function HoneyCard({ data }) {
  const location = useLocation();
  const [order, setOrder] = useState(false);
  const [cart, setCart] = useAtom(cartAtom);

  useEffect(() => {
    if (data) {
      // Проверяем, что data не равно null или undefined
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      const isProductInCart = storedCart.some((item) => item.id === data.id);
      setOrder(isProductInCart);
      setCart(storedCart);
    }
  }, [data]);
  const addToCart = (product) => {
    if (!order) {
      // Если продукт еще не в корзине, добавляем его
      const updatedCart = [...cart, product];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setOrder(true);
    } else {
      // Если продукт уже в корзине, удаляем его
      const updatedCart = cart.filter((item) => item.id !== product.id);
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setOrder(false);
    }
  };

  return (
    <>
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
          <div className="card__btn">
            <button className="btn__buy" onClick={() => addToCart(data)}>
              {order ? "Убрать из корзины" : "В корзину"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
