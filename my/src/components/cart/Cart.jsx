import React from 'react';
import { useAtom } from 'jotai';
import { cartAtom } from '../allProduct/cartAtom';
import HoneyCard from "../allProduct/honeyCard/HoneyCard";
import "./Cart.scss";

const Cart = () => {
  const [cart] = useAtom(cartAtom)||JSON.parse(localStorage.getItem("cart")) || []

  return (
    <div className="cart">
      <h1 className='cart_headText'>Корзина</h1>
      {cart.length === 0 ? (
        <h1 className='cart_text'>Корзина пуста</h1>
      ) : (
        <div>
        <ul  className='cart_HoneyCards'>
          {cart.map((item, index) => (
             <HoneyCard />
          ))}
        </ul>
        </div>
      )}
    </div>
  );
};

export default Cart;  