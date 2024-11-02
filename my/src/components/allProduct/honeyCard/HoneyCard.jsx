import "./HoneyCard.scss";
import OrderHoney from "./orderHoney/OrderHoney";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { BsFillFileTextFill } from "react-icons/bs";
import { GiHoneyJar } from "react-icons/gi";

import { useAtom } from "jotai";
import { cartAtom } from "../cartAtom";
import { useState,useEffect } from "react";

export default function HoneyCard({ data }) {
  const location = useLocation();
  const [order, setOrder] = useState(false);
  const [cart, setCart] = useAtom(cartAtom);

  useEffect(() => {
    // Проверяем, есть ли продукт в корзине при загрузке компонента
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const isProductInCart = storedCart.some(item => item.id === data.id);
    setOrder(isProductInCart);
    setCart(storedCart);
  }, [data.id]);

  const addToCart = (product) => {
    if (!order) {
      // Если продукт еще не в корзине, добавляем его
      const updatedCart = [...cart, product];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setOrder(true);
    } else {
      // Если продукт уже в корзине, удаляем его
      const updatedCart = cart.filter(item => item.id !== product.id);
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setOrder(false);
    }
  };

  return (
    <>
      <div className="card">
        <div className="card__photoProduct">
          <GiHoneyJar className="honeyJar" />
        </div>
        <div className="card__text">
          <h3 className="card__price">{data.price}₽</h3>
          <p className="card__title">{data.title}</p>
          <div className="card__btn">
            <Link
              to={"/descriptionProduct"}
              state={{ description: data.description }} // Передаем описание в state
            >
              <BsFillFileTextFill className="btn__descr" />
            </Link>
            <button className="btn__buy" onClick={() => addToCart(data)}>
              {order ? 'Убрать' : 'Заказать'}
            </button>
          </div>
        </div>
      </div>

      <Routes>
        <Route path="/orderHoney" element={<OrderHoney />} />
      </Routes>
    </>
  );
}
