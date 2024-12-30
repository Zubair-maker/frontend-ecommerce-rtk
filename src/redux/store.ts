import { configureStore } from "@reduxjs/toolkit";
import { productAPI } from "./api-rtk/productApi";
import { userAPI } from "./api-rtk/userAPI";
import { userReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { orderApi } from "./api-rtk/orderApi";
import { dashboardApi } from "./api-rtk/dashboardApi";

export const server = import.meta.env.VITE_SERVER;

export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    [productAPI.reducerPath]: productAPI.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    userReducer: userReducer.reducer,
    cartReducer: cartReducer.reducer,
  },
  middleware: (mid) => [
    ...mid(),
    userAPI.middleware,
    productAPI.middleware,
    orderApi.middleware,
    dashboardApi.middleware
  ],
});
