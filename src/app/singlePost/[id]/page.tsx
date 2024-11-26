"use client";
import Post from "@/app/_Componantes/post/Post";
import Loading from "@/app/loading";
import { getSinglePosts } from "@/lib/Redux/PostSlice";
import { Store } from "@/lib/Redux/ReduxStore";
import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function SinglePost({ params }) {
  const dispatch = useDispatch<typeof Store.dispatch>();
  const { singlePost } = useSelector(
    (state: ReturnType<typeof Store.getState>) => state.posts
  );
  useEffect(() => {
    dispatch(getSinglePosts(params.id));
  }, []);
  return singlePost ? (
    <Box component="div" sx={{ mx: "auto", width: "60%", mt: "15px" }}>
      <Post PostObj={singlePost} isMoreComments />
    </Box>
  ) : (
    <Loading />
  );
}
