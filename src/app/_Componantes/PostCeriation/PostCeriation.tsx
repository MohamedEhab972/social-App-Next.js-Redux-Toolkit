"use client";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import ImageIcon from "@mui/icons-material/Image";
import axios from "axios";
import toast from "react-hot-toast";
import styled from "@emotion/styled";

const VisuallyHiddenInput = styled("input")({
  opacity: 0,
  height: "100%",
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: "100%  ",
});

export default function PostCeriation() {
  const [open, setOpen] = useState(false);
  const foucusText = useRef<HTMLInputElement>();
  const postInputText = useRef<HTMLInputElement>();
  const postInputImage = useRef<HTMLInputElement>();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleFoucus = () => {
    handleOpen();
    foucusText.current?.blur();
  };

  const createPost = () => {
    const textInput = postInputText.current?.value || "";
    const paylod = new FormData();
    paylod.append("body", textInput);
    if (postInputImage.current?.files?.[0]) {
      paylod.append("image", postInputImage.current?.files?.[0]);
    }
    axios
      .post("https://linked-posts.routemisr.com/posts", paylod, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
        toast.success("The creation is done", { position: "top-right" });
        handleClose();
      })
      .catch((err) => {
        console.log(err);
        toast.error("The creation is feild", { position: "top-right" });
        handleClose();
      });
  };

  return (
    <>
      <Paper elevation={12}>
        <TextField
          inputRef={foucusText}
          onFocus={handleFoucus}
          placeholder="Add Your Post..."
          fullWidth
          multiline
          rows={6}
        />

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper elevation={12} sx={{ width: "60%" }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", p: 2 }}
            >
              <Typography component="h5" variant="h6">
                Submit Post
              </Typography>
              <Button onClick={createPost}>Submit</Button>
            </Box>
            <TextField
              inputRef={postInputText}
              //   onFocus={handleOpen}
              placeholder="Add Your Post..."
              fullWidth
              multiline
              rows={6}
            />
            <IconButton
              aria-label="settings"
              sx={{ my: "10px", display: "block", mx: "auto" }}
            >
              <ImageIcon />
              <VisuallyHiddenInput
                ref={postInputImage}
                type="file"
                onChange={(event) => console.log(event.target.files)}
                multiple
              />
            </IconButton>
          </Paper>
        </Modal>

        {/* <Divider sx={{my:"5px"}} /> */}
        <IconButton
          onClick={handleOpen}
          aria-label="settings"
          sx={{ my: "10px", display: "block", mx: "auto" }}
        >
          <ImageIcon />
        </IconButton>
      </Paper>
    </>
  );
}
