import { TypePost } from "@/app/_interfaces/home.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: {
  allPosts: TypePost[] | null;
  isLoading: boolean;
  singlePost: TypePost | null;
} = {
  allPosts: null,
  isLoading: false,
  singlePost: null,
};

export const getAllPosts = createAsyncThunk(
  "posts/getAllPosts",
  (limit: number = 30) => {
    return axios.get<{ message: string; posts: TypePost[] }>(
      `https://linked-posts.routemisr.com/posts?limit=${limit}`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
  }
);
export const getSinglePosts = createAsyncThunk(
  "posts/getSinglePosts",
  (id: string) => {
    return axios.get<{ post: TypePost }>(
      `https://linked-posts.routemisr.com/posts/${id}`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
  }
);

export const PostsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      state.isLoading = true;
      console.log(action);
      state.allPosts = action.payload.data?.posts;
      state.isLoading = false;
    });
    builder.addCase(getAllPosts.rejected, (state, action) => {
      state.isLoading = true;
      console.log(action);
      state.isLoading = false;
    });
    builder.addCase(getSinglePosts.fulfilled, (state, action) => {
      state.isLoading = true;
      state.singlePost = action.payload.data.post;
      state.isLoading = false;
    });
    // builder.addCase(getAllPosts.pending, (state, action) => {});
  },
});

export const PostsReducer = PostsSlice.reducer;
