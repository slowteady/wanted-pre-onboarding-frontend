import { Box, Typography } from "@mui/material";
import React from "react";

// ----------------------------------------------------------------------
// Todo 리스트 컴포넌트
// ----------------------------------------------------------------------

const TodoList = () => {
  return (
    <>
      <Typography
        component="h1"
        variant="h5"
        sx={{ mb: 3, textAlign: "center" }}
      >
        TODO
      </Typography>
      <Box sx={{ flex: 1, overflowY: "auto", mb: 3 }}></Box>
    </>
  );
};

export default TodoList;
