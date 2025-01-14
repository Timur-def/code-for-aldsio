import { useAtom } from "jotai"
import { useEffect, useState } from "react"
import { cartAtom } from "../cartAtom"
import "./AddCartButton.scss"
export default function AddCartButton({ data }) {
  const [order, setOrder] = useState(false)
  const [cart, setCart] = useAtom(cartAtom)
  useEffect(() => {
    if (data) {
      // Проверяем, что data не равно null или undefined
      const storedCart = JSON.parse(localStorage.getItem("cart")) || []
      const isProductInCart = storedCart.some((item) => item.id === data.id)
      setOrder(isProductInCart)
      setCart(storedCart)

    }
  }, [data])
  const addToCart = (product) => {
    if (!order) {
      // Если продукт еще не в корзине, добавляем его
      const updatedCart = [...cart, product]
      setCart(updatedCart)
      localStorage.setItem("cart", JSON.stringify(updatedCart))
      setOrder(true)
    } else {
      // Если продукт уже в корзине, удаляем его
      const updatedCart = cart.filter((item) => item.id !== product.id)
      setCart(updatedCart)
      localStorage.setItem("cart", JSON.stringify(updatedCart))
      setOrder(false)
    }
  }
  return (
    <div className="btn">
      <button className="btn__buy" onClick={() => addToCart(data)}>
        {order ? "Убрать из корзины" : "В корзину"}
      </button>
    </div>
  )
}