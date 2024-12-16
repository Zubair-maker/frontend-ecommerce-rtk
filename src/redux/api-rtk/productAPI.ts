import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  DeleteProductRequest,
  MesssageResponse,
  NewProductRequest,
  ProductCategoryRespponse,
  ProductDetailsResponse,
  ProductResponse,
  SearchProductRequest,
  SearchProductResponse,
  UpdateProductRequest,
} from "../../types/api-types";

export const productAPI = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/`,
  }),
  tagTypes:["product"],
  endpoints: (builder) => ({
    latestProduct: builder.query<ProductResponse, string>({
      query: () => "latest",
      providesTags: ["product"],
    }),
    allAdminProduts: builder.query<ProductResponse, string>({
      query: (id) => `admin-product?id=${id}`,
      providesTags: ["product"],
    }),
    productCategory: builder.query<ProductCategoryRespponse, string>({
      query: () => "allcategories",
      providesTags: ["product"],
    }),
    searchProduct: builder.query<SearchProductResponse, SearchProductRequest>({
      //   query: (data) => `all?price=${data.price}`
      query: ({ price, sort, page, category, search }) => {
        let base = `all?search=${search}&page=${page}`;
        if (price) base += `&price=${price}`;
        if (sort) base += `&sort=${sort}`;
        if (category) base += `&category=${category}`;
        return base;
      },
      providesTags: ["product"],
    }),
    ProdutDetails: builder.query<ProductDetailsResponse, string>({
      query: (id) => id,
      providesTags: ["product"],
    }),
    createProduct: builder.mutation<MesssageResponse, NewProductRequest>({
      query: ({ formData, id }) => ({
        url: `new?id=${id}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }),
    updateProduct: builder.mutation<MesssageResponse, UpdateProductRequest>({
      query: ({ formData, userId, productId }) => ({
        url: `${productId}?id=${userId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }),
    deleteProduct: builder.mutation<MesssageResponse, DeleteProductRequest>({
      query: ({ userId, productId }) => ({
        url: `${productId}?id=${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useLatestProductQuery,
  useAllAdminProdutsQuery,
  useProductCategoryQuery,
  useSearchProductQuery,
  useCreateProductMutation,
  useProdutDetailsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productAPI;

//product/latest/latest = latestProduct  get method so use qeury
//product/admin-product?id=dwjdnwj = allAdminProduts
//product/all?search=MI&price=2000&category=electronocs&page=6 = searchProduct-useSearchProductQuery
//product/675fc56d7140c3918ef21543 params  ProdutDetails- useProdutDetailsQuery
