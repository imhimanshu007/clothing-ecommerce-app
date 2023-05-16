import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducers/reducers.utils";

export const addCartItemHelper = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (item) => item.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((item) =>
      item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const removeItemFromCartHelper = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (item) => item.id === cartItemToRemove.id
  );

  if (existingCartItem.quantity === 1)
    return cartItems.filter((item) => item.id !== cartItemToRemove.id);
  else
    return cartItems.map((item) => {
      return item.id === cartItemToRemove.id
        ? { ...item, quantity: item.quantity - 1 }
        : item;
    });
};

export const deleteProductFromCartHelper = (cartItems, productToRemove) => {
  const existingCartItem = cartItems.find(
    (item) => item.id === productToRemove.id
  );

  if (existingCartItem)
    return cartItems.filter((item) => item.id !== productToRemove.id);
};

export const CartContext = createContext({
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  totalCartValue: 0,
  setIsCartOpen: () => {},
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  deleteProductFromCart: () => {},
});

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  totalCartValue: 0,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return { ...state, ...payload };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return { ...state, isCartOpen: payload };
    default:
      throw new Error(`unhandled type of ${type} in cartReducer`);
  }
};

export const CartProvider = ({ children }) => {
  const [{ isCartOpen, cartItems, cartCount, totalCartValue }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );

    const newTotalCartValue = newCartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartCount: newCartCount,
        totalCartValue: newTotalCartValue,
      })
    );
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItemHelper(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemFromCart = (cartItemToRemove) => {
    const newCartItems = removeItemFromCartHelper(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const deleteProductFromCart = (productToRemove) => {
    const newCartItems = deleteProductFromCartHelper(
      cartItems,
      productToRemove
    );
    updateCartItemsReducer(newCartItems);
  };

  const setIsCartOpen = (bool) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    deleteProductFromCart,
    cartCount,
    totalCartValue,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
