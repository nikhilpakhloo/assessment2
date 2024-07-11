import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  userInfo: {
    name: "Nikhil Pakhloo",
    Title: "Frontend developer",
  },
  userToken: null,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export default authSlice.reducer;
