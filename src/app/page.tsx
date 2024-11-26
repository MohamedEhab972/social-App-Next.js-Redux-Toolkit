"use client";
import { Grid } from "@mui/material";
import Post from "./_Componantes/post/Post";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/lib/Redux/ReduxStore";
import { useEffect } from "react";
import { getAllPosts } from "@/lib/Redux/PostSlice";
import { TypePost } from "./_interfaces/home.types";
import Loading from "./loading";
import PostCeriation from "./_Componantes/PostCeriation/PostCeriation";

export default function Home() {
  const dispatch = useDispatch<typeof Store.dispatch>();
  const { allPosts } = useSelector(
    (state: ReturnType<typeof Store.getState>) => state.posts
  );

  useEffect(() => {
    dispatch(getAllPosts(30));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {allPosts ? (
        <Grid container spacing={5}>
          <Grid item xs={3}></Grid>

          <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              mt: "20px",
            }}
          >
            <PostCeriation />
            {allPosts?.map((post: TypePost) => (
              <Post key={post._id} PostObj={post} />
            ))}
          </Grid>

          <Grid item xs={3}></Grid>
        </Grid>
      ) : (
        <Loading />
      )}
    </>
  );
}
