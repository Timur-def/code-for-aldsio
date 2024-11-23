import React from 'react';
import { useAtom } from 'jotai';
import { cartAtom } from '../allProduct/cartAtom';
import HoneyCard from "../allProduct/honeyCard/HoneyCard";
import "./Cart.scss";

const Cart = () => {
  const [cart] = useAtom(cartAtom)||JSON.parse(localStorage.getItem("cart")) || []

  return (
    <div className="cart">
      <h2>Корзина</h2>
      {cart.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <div  className='cart_HoneyCard'>
        <ul>
          {cart.map((item, index) => (
             <HoneyCard key={index} data={item}/>
          ))}
        </ul>
        </div>
      )}
    </div>
  );
};

export default Cart;