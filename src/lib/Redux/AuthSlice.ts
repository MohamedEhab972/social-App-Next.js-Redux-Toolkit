import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: {
  token: null | string;
  userdata: null;
  isLoding: boolean;
  isError: boolean;
} = {
  token: null,
  userdata: null,
  isLoding: false,
  isError: false,
};

export const Login = createAsyncThunk(
  "AuthSlice/Login",
  async (values: { email: string; password: string }) => {
    return await axios
      .post("https://linked-posts.routemisr.com/users/signin", values)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error;
      });
  }
);

export const AuthSlice = createSlice({
  name: "AuthSlice",
  initialState,
  reducers: {
    clearUserData: (states) => {
      states.token = null;
      states.userdata = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(Login.fulfilled, (state, action) => {
      localStorage.setItem("token", action.payload.data?.token);
      state.isLoding = false;
      state.token = action.payload.data?.token;
    });
    builder.addCase(Login.pending, (state) => {
      state.isLoding = false;
    });
    builder.addCase(Login.rejected, (state) => {
      state.isLoding = false;
      state.isError = true;
    });
  },
});

export const AuthReducer = AuthSlice.reducer;
