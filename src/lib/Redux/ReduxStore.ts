import { configureStore } from "@reduxjs/toolkit";
import { AuthReducer } from "./AuthSlice";
import { PostsReducer } from "./PostSlice";

export const Store = configureStore({
  reducer: {
    auth: AuthReducer,
    posts: PostsReducer,
  },
});
