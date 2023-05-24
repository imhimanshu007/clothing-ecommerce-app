import { createSlice } from "@reduxjs/toolkit";

const addCartItemHelper = (cartItems, productToAdd) => {
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

const removeItemFromCartHelper = (cartItems, cartItemToRemove) => {
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

const deleteProductFromCartHelper = (cartItems, productToRemove) => {
  const existingCartItem = cartItems.find(
    (item) => item.id === productToRemove.id
  );

  if (existingCartItem)
    return cartItems.filter((item) => item.id !== productToRemove.id);
};

const CART_INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: CART_INITIAL_STATE,
  reducers: {
    setIsCartOpen(state, action) {
      state.isCartOpen = action.payload;
    },
    addItemToCart(state, action) {
      state.cartItems = addCartItemHelper(state.cartItems, action.payload);
    },
    removeItemFromCart(state, action) {
      state.cartItems = removeItemFromCartHelper(
        state.cartItems,
        action.payload
      );
    },
    deleteProductFromCart(state, action) {
      state.cartItems = deleteProductFromCartHelper(
        state.cartItems,
        action.payload
      );
    },
  },
});

export const {
  setIsCartOpen,
  addItemToCart,
  removeItemFromCart,
  deleteProductFromCart,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
