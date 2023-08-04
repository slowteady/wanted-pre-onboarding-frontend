import { Box, Container } from "@mui/material";
import React from "react";

// ----------------------------------------------------------------------
// TODO 레이아웃 컴포넌트
// ----------------------------------------------------------------------

const TodoLayout = ({ children }) => {
  return (
    <Container
      sx={{
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          width: "600px",
          height: "400px",
          backgroundColor: "rgba(252, 252, 192, 0.7)",
          p: 5,
        }}
      >
        {children}
      </Box>
    </Container>
  );
};

export default TodoLayout;
