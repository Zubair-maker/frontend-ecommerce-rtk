import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MesssageResponse } from "../../types/api-types";
import { User } from "../../types/types";

export const userAPI = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/user` }),
  endpoints: (builder) => ({
    login: builder.mutation<MesssageResponse, User>({
      query: (user) => ({
        url: "/new",
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const { useLoginMutation } = userAPI as typeof userAPI;

//router.post("/new", newUser); our route in user in BE nodejs url: "/new",
