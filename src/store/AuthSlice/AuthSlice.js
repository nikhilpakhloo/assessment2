import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {  createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../firebase";

const initialState = {
  loading: false,
  userInfo: null,
  userToken: null,
  error: null,
  success: false,
};

// Sign Up
export const signUp = createAsyncThunk("auth/signUp", async ({ email, password }) => {
  try {
  
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
   
    return userCredential.user;
  } catch (error) {
   
    throw error;
  }
});

// Sign In
export const signIn = createAsyncThunk("auth/signIn", async ({ email, password }) => {
  try {

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
});

// Logout
export const logout = createAsyncThunk("auth/logout", async () => {
  try {
  
    await signOut(auth);
    return true;
  } catch (error) {
    throw error;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.userToken = action.payload.uid;
        state.success = true;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.userToken = action.payload.uid;
        state.success = true;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.userInfo = null;
        state.userToken = null;
        state.success = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearError } = authSlice.actions;

export default authSlice.reducer;
