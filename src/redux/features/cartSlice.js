import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: JSON.parse(localStorage.getItem('cart')) || [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const updatedCart = [...state.cart, action.payload];
      state.cart = updatedCart;
      localStorage.setItem('cart', JSON.stringify(updatedCart));  // Guardar en localStorage
    },
    removeFromCart: (state, action) => {
      const updatedCart = state.cart.filter(item => item.id !== action.payload.id);
      state.cart = updatedCart;
      localStorage.setItem('cart', JSON.stringify(updatedCart));  // Guardar en localStorage
    },
    clearCart: (state) => {
      state.cart = [];
      localStorage.removeItem('cart');  // Limpiar localStorage
    },
    setCart: (state, action) => {
      state.cart = action.payload;
      localStorage.setItem('cart', JSON.stringify(action.payload));  // Sincronizar con localStorage
    },
  },
});

export const { addToCart, removeFromCart, clearCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;
