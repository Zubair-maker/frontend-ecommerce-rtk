import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MesssageResponse, UserResponse } from "../../types/api-types";
import { User } from "../../types/types";
import axios from "axios";

export const userAPI = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/user/`,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<MesssageResponse, User>({
      query: (user) => ({
        url: "new",
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const getUser = async (id: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const { data }: { data: UserResponse } = await axios.get(
      `${import.meta.env.VITE_SERVER}/api/v1/user/${id}`
    );
    // const data: UserResponse = res.data;
    return data;
  } catch (error) {
    throw error;
  }
};

export const { useLoginMutation } = userAPI as typeof userAPI;

//router.post("/new", newUser); our route in user in BE nodejs url: "/new",
