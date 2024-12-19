import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AllOrderRequest,
  AllOrderResponse,
  MesssageResponse,
  placeOrderRequest,
  singleOrderResponse,
  UpdateOrderRequest,
} from "../../types/api-types";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/order/`,
  }),
  tagTypes: ["order"],
  endpoints: (builder) => ({
    placeOrder: builder.mutation<MesssageResponse, placeOrderRequest>({
      query: (order) => ({
        url: "new",
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["order"],
    }),
    myOrder: builder.query<MesssageResponse, AllOrderRequest>({
      query: (id) => `myorders?id=${id}`,
      providesTags: ["order"],
    }),
    AllOrder: builder.query<AllOrderResponse, string>({
      query: (id) => `allorders?id=${id}`,
      providesTags: ["order"],
    }),
    singleOrder: builder.query<singleOrderResponse, string>({
      query: (id) => id,
      providesTags: ["order"],
    }),
    orderStatusUpdate: builder.mutation<MesssageResponse, UpdateOrderRequest>({
      query: ({ orderId, adminId }) => ({
        url: `${orderId}?id=${adminId}`,
        method: "PUT",
      }),
      invalidatesTags: ["order"],
    }),
    deleteOrder: builder.mutation<MesssageResponse, UpdateOrderRequest>({
      query: ({ orderId, adminId }) => ({
        url: `${orderId}?id=${adminId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["order"],
    }),
  }),
});

export const {
  usePlaceOrderMutation,
  useAllOrderQuery,
  useOrderStatusUpdateMutation,
  useMyOrderQuery,
  useSingleOrderQuery,
  useDeleteOrderMutation,
} = orderApi;

//http://localhost:4000/api/v1/order/myorders?id=dwjdnwjfdgfdgerwrg54ff
//http://localhost:4000/api/v1/order/allorders?id=dwjdnwjfdgfdgerwrg54ff
//http://localhost:4000/api/v1/order/674ee04609852cf6d51a2976 router.get("/:id", getSingleOrder);
//http://localhost:4000/api/v1/order/674ee04609852cf6d51a2976?id=dwjdnwj router.put("/:id", isAdmin, processOrderStatus);
