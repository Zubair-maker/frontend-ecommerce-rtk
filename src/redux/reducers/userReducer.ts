import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserReducerInitialState } from "../../types/types";

const initialState: UserReducerInitialState = {
  user: null,
  loading: false,
};

export const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    userExist: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.user = action.payload;
    },
    userNotExist: (state) => {
      state.loading = true;
      state.user = null;
    },
  },
});

export const { userExist, userNotExist } = userReducer.actions;
