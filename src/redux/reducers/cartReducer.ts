import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartReducerInitialState } from "../../types/types";

const initialState: CartReducerInitialState = {
  loading: false,
  cartItems: [],
  subtotal: 0,
  tax: 0,
  shippingCharges: 0,
  discount: 0,
  total: 0,
  shippingInfo: {
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  },
};

export const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.loading = true;
      const existingProduct = state.cartItems.find(
        (i) => i.productId === action.payload.productId
      );
      if (existingProduct) {
        // Update the quantity of the existing product
        existingProduct.quantity = action.payload.quantity;
      } else {
        // Add new product to the cart
        state.cartItems.push(action.payload);
      }
      state.loading = false;
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.loading = true;
      //item.productId !== action.payloan after deleteing a product the remaining products store in  state.cartItems array
      //bcz filter create a new array
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== action.payload
      );
      state.loading = false;
    },
    calculatePrice: (state) => {
      let subtotal = 0;
      for (let i = 0; i < state.cartItems.length; i++) {
        const item = state.cartItems[i];
        subtotal += item.price * item.quantity;
      }
      state.subtotal = subtotal;
      state.shippingCharges = state.subtotal > 1200 ? 0 : 100;
      state.tax = Math.round(state.subtotal * 0.15);
      state.total =
        state.subtotal + state.tax + state.shippingCharges + state.discount;
    },
    coupenDiscount: (state, action: PayloadAction<number>) => {
      state.discount = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, calculatePrice, coupenDiscount} =
  cartReducer.actions;
