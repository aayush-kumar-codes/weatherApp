import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    isUserLoggedIn: false,
    username: null,
  },
  reducers: {
    login: (state, action) => {
      if (
        action.payload.username === "admin" ||
        action.payload.username === "user"
      )
        if (action.payload.username === action.payload.password) {
          state.isUserLoggedIn = true;
          state.username = action.payload.username;
        }
    },
    logout: (state, action) => {
      state.isUserLoggedIn = false;
      state.username = null;
    },
  },
});

export const { login, logout} = counterSlice.actions;

export default counterSlice.reducer;
