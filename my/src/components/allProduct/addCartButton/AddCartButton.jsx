import "./AddCartButton.scss"
import { useAtom } from "jotai";
import { cartAtom } from "../cartAtom";
import { useState, useEffect } from "react";
import dateProduct from "../dateProduct.json"
export default function AddCartButton() {
    const [order, setOrder] = useState(false);
      const [cart, setCart] = useAtom(cartAtom);
    const data = dateProduct.PRODUCT.map(item=>item)
      useEffect(() => {
        if (data && data.id) { // Проверка на наличие data и data.id
          const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
          const isProductInCart = storedCart.some((item) => item.id === data.id);
          setOrder(!order);
          setCart(storedCart);
        }
      }, [data]);
      const addToCart = () => {
        if (!order) {
          // Если продукт еще не в корзине, добавляем его
          const updatedCart = [...cart, data];
          setCart(updatedCart);
          localStorage.setItem("cart", JSON.stringify(updatedCart));
          setOrder(true);
        } else {
          // Если продукт уже в корзине, удаляем его
          const updatedCart = cart.filter((item) => item.id !== data.id);
          setCart(updatedCart);
          localStorage.setItem("cart", JSON.stringify(updatedCart));
          setOrder(false);
        }
      };
  return (
    <div className="btn">
    <button className="btn__buy" onClick={() => addToCart}>
      {order ? "Убрать из корзины" : "В корзину"}
    </button>
    </div>
  );
}
