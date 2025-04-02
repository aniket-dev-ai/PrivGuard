import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, signupUser } from "../api/authApi";

// Login Thunk
export const login = createAsyncThunk("auth/login", async (userData, thunkAPI) => {
  try {
    const data = await loginUser(userData);
    localStorage.setItem("token", data.token);  
    console.log(data);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// Signup Thunk
export const signup = createAsyncThunk("auth/signup", async (userData, thunkAPI) => {
  try {
    const data = await signupUser(userData);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action);
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Signup
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
    console.log(action);
        state.loading = false;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Actions Export
export const { logout } = authSlice.actions;

// Reducer Export
export default authSlice.reducer;
