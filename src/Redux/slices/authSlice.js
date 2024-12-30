import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: JSON.parse(localStorage.getItem("microdeft-auth")) || null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, { payload }) => {
      state.auth = payload;
      localStorage.setItem("microdeft-auth", JSON.stringify(payload));
    },
    removeAuth: (state) => {
      state.auth = null;
      localStorage.removeItem("microdeft-auth");
    },
  },
});

export const { setAuth, removeAuth } = authSlice.actions;
export default authSlice.reducer;
