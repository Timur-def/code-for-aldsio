
import { useAtom, useSetAtom } from 'jotai' // Заменяем useUpdateAtom на useSetAtom
import React, { useEffect } from 'react'
import { useCartStore } from "../../store/cart"
import HoneyCard from "../allProduct/honeyCard/HoneyCard"
import "./Cart.scss"

const Cart = () => {
  const { cart, fetchCart } = useCartStore()
  useEffect(() => {
    fetchCart()
    
  }, [fetchCart])
  return (
    <div className="cart">
      <h1 className='cart_headText'>Корзина</h1>
      {cart.length === 0 ? (
        <h1 className='cart_text'>Корзина пуста</h1>
      ) : (
        <div>
          <ul className='cart_HoneyCards'>
            {cart.map((item, index) => (
              <HoneyCard key={index} data={item} />
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Cart