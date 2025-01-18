
import { useState, useEffect } from "react"
import { useCartStore } from "../../../store/cart"

import "./AddCartButton.scss"
export default function AddCartButton({ data }) {
  const [order, setOrder] = useState(false)
  const { addProduct, cart, deleteProduct, fetchCart, isProductInCart } = useCartStore()

  useEffect(() => {
    fetchCart()
  }, [fetchCart])



  const addToCart = async (product) => {
    if (isProductInCart(product._id,cart)) {
      const { succes, message } = await deleteProduct(product._id);
      console.log(succes, message);
      setOrder(false);
      console.log(`Продукт с id ${product._id} уже существует в корзине.`);
      return;
    }

    const { succes, message } = await addProduct(product);
    console.log(succes, message);
    console.log(product);

    if (succes) {
      setOrder(true);
    }
  }

  return (
    <div className="btn">
      <button className="btn__buy" onClick={() => addToCart(data)}>
        {isProductInCart(data._id,cart) ? "Убрать из корзины" : "В корзину"}
      </button>
    </div>
  )
}