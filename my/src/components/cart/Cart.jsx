import React from 'react';
import { useAtom } from 'jotai';
import { cartAtom } from '../allProduct/cartAtom';

const Cart = () => {
  const [cart] = useAtom(cartAtom);

  return (
    <div className="cart">
      <h2>Корзина</h2>
      {cart.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>{item.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;