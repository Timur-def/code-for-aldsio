import "./AddCartButton.scss"
import { useAtom } from "jotai";
import { cartAtom } from "../cartAtom";
import { useState, useEffect } from "react";
import dateProduct from "../dateProduct.json"
export default function AddCartButton({data}) {
    const [order, setOrder] = useState(false);
      const [cart, setCart] = useAtom(cartAtom);
    // const data = dateProduct.PRODUCT.map(item=>item)
      const addToCart = (data) => {
        if (!order) {
          // Если продукт еще не в корзине, добавляем его
          const updatedCarts = [...cart, data];
          setCart(updatedCarts);
          localStorage.setItem("cart", JSON.stringify(updatedCarts));
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
    <button className="btn__buy" onClick={() => addToCart(data)}>
      {order ? "Убрать из корзины" : "В корзину"}
    </button>
    </div>
  );
}
