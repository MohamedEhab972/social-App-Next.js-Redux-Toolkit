"use client";
import { Login } from "@/lib/Redux/AuthSlice";
import { Store } from "@/lib/Redux/ReduxStore";
import { Button, Container, Paper, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export default function Page() {
  const navigat = useRouter();
  const dispatch = useDispatch<typeof Store.dispatch>();
  const Formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
      dispatch(Login(values))
        .then((res) => {
          console.log(res);
          if (res.payload?.data?.message == "success") {
            toast.success("Welcome back");
            navigat.push("/");
          } else {
            toast.error(res.payload?.response?.data?.error);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <>
      <Container
        maxWidth="sm"
        sx={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper elevation={10} sx={{ width: "100%" }}>
          <form
            onSubmit={Formik.handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              padding: "15px",
            }}
          >
            <TextField
              type="text"
              name="email"
              onChange={Formik.handleChange}
              value={Formik.values.email}
              id="email"
              label="Email..."
              variant="outlined"
            />
            <TextField
              type="password"
              name="password"
              onChange={Formik.handleChange}
              value={Formik.values.password}
              id="password"
              label="Password..."
              variant="outlined"
            />

            <Button
              type="submit"
              sx={{
                backgroundColor: "#09c",
                border: "1px solid #09c",
                color: "white",
                ":hover": {
                  color: "#09c",
                  backgroundColor: "white",
                  border: "1px solid #09c",
                },
              }}
            >
              Login
            </Button>
          </form>
        </Paper>
      </Container>
    </>
  );
}
