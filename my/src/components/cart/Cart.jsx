// Cart.js
import { useAtom, useSetAtom } from 'jotai' // Заменяем useUpdateAtom на useSetAtom
import React from 'react'
import { cartAtom } from '../allProduct/cartAtom'
import HoneyCard from "../allProduct/honeyCard/HoneyCard"
import "./Cart.scss"

const Cart = () => {
  const [cart] = useAtom(cartAtom) // Используем useAtom для получения текущего состояния
  const setCart = useSetAtom(cartAtom) // Используем useSetAtom для обновления состояния

  // Фильтруем массив, оставляя только объекты
  const validCart = cart.filter((item) => item && typeof item === "object" && !Array.isArray(item))

  console.log(validCart) // Проверьте отфильтрованные данные

  const handleAddToCart = (item) => {
    // Обновляем атом cartAtom
    setCart((prevCart) => [...prevCart, item])
  }

  const handleRemoveFromCart = (item) => {
    // Обновляем атом cartAtom
    setCart((prevCart) => prevCart.filter((i) => i !== item))
  }

  return (
    <div className="cart">
      <h1 className='cart_headText'>Корзина</h1>
      {validCart.length === 0 ? (
        <h1 className='cart_text'>Корзина пуста</h1>
      ) : (
        <div>
          <ul className='cart_HoneyCards'>
            {validCart.map((item, index) => (
              <HoneyCard key={index} data={item} onAddToCart={handleAddToCart} onRemoveFromCart={handleRemoveFromCart} />
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Cart