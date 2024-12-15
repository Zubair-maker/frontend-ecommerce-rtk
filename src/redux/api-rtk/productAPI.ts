import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  MesssageResponse,
  NewProductRequest,
  ProductCategoryRespponse,
  ProductResponse,
  SearchProductRequest,
  SearchProductResponse,
} from "../../types/api-types";

export const productAPI = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/`,
  }),
  endpoints: (builder) => ({
    latestProduct: builder.query<ProductResponse, string>({
      query: () => "latest",
    }),
    allAdminProduts: builder.query<ProductResponse, string>({
      query: (id) => `admin-product?id=${id}`,
    }),
    productCategory: builder.query<ProductCategoryRespponse, string>({
      query: () => "allcategories",
    }),
    searchProduct: builder.query<SearchProductResponse, SearchProductRequest>({
      //   query: (data) => `all?price=${data.price}`
      query: ({ price, sort, page, category, search }) => {
        let base = `all?search=${search}&page=${page}`;
        if (price) base += `&price=${price}`;
        if (sort) base += `&price=${sort}`;
        if (category) base += `&price=${category}`;
        return base;
      },
    }),
    createProduct: builder.mutation<MesssageResponse, NewProductRequest>({
      query: ({ formData, id }) => ({
        url: `new?id=${id}`,
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useLatestProductQuery,
  useAllAdminProdutsQuery,
  useProductCategoryQuery,
  useSearchProductQuery,
  useCreateProductMutation,
} = productAPI;

//product/latest/latest = latestProduct  get method so use qeury
//product/admin-product?id=dwjdnwj = allAdminProduts
//product/all?search=MI&price=2000&category=electronocs&page=6 = searchProduct-useSearchProductQuery
