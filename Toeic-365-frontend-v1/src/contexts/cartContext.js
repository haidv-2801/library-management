import React, { useState } from 'react';
import { getUserID } from '../constants/commonAuth';
import { ParseJson } from '../constants/commonFunction';
import { getLocalStorage, setLocalStorage } from './authContext';

const CART_ID = 'CART_' + getUserID();

export const CartContext = React.createContext({
  size: 0,
  cart: [],
  total: 0,
  add: () => {},
  remove: () => {},
  checkout: () => {},
});

/**
 * id
 * amount
 */
const CartContextProvider = (props) => {
  const INITITAL = ParseJson(getLocalStorage(CART_ID));
  const [cart, setCart] = useState(INITITAL ?? null);

  const add = (item) => {
    try {
      let newCart = null;
      if (!cart) {
        newCart = [{ id: item.id, amount: item.amount }];
      } else {
        let existsItem = cart.find((c) => c.id === item.id);
        if (existsItem) {
          existsItem.amount += item.amount;
          newCart = [
            { id: existsItem.id, amount: existsItem.amount },
            ...cart.filter((item) => item.id !== existsItem.id),
          ];
        } else {
          newCart = [{ id: item.id, amount: item.amount }, ...cart];
        }
      }
      setCart(newCart);
      setLocalStorage(CART_ID, JSON.stringify(newCart));
      return true;
    } catch (error) {
      return false;
    }
  };

  const remove = (id) => {
    if (!cart) return;
    let newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
    setLocalStorage(newCart);
  };

  const checkout = async () => {
    const userID = getUserID();
  };

  const calcTotal = () => {
    if (!cart) return 0;
    const total = cart.reduce((a, b) => Number(a.amount) + Number(b.amount));
    return total;
  };

  const contextValue = {
    size: cart?.length ?? 0,
    cart,
    total: calcTotal(),
    add,
    remove,
    checkout: checkout,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
