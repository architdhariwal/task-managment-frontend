import { createSlice } from "@reduxjs/toolkit";
import { LOGIN_SUCCESS, LOGOUT } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(LOGIN_SUCCESS, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(LOGOUT, (state) => {
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export default authSlice.reducer;