import { configureStore } from "@reduxjs/toolkit";
import { productAPI } from "./api-rtk/productApi";
import { userAPI } from "./api-rtk/userAPI";
import { userReducer } from "./reducers/userReducer";

export const server = import.meta.env.VITE_SERVER;

export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    [productAPI.reducerPath]: productAPI.reducer,
    userReducer: userReducer.reducer,
  },
  middleware: (mid) => [...mid(), userAPI.middleware,productAPI.middleware],
});
