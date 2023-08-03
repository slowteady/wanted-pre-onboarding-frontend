import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

// ----------------------------------------------------------------------
// 메인 페이지 컴포넌트
// ----------------------------------------------------------------------

const Main = () => {
  const navigate = useNavigate();

  // 회원가입 버튼 핸들링
  const handleSignupBtn = () => {
    navigate("/signup");
  };

  return (
    <>
      <Container sx={{ height: "80vh" }}>
        <Box
          sx={{
            m: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            로그인
          </Typography>
          <form>
            <TextField
              required
              fullWidth
              label="이메일"
              inputProps={{
                "data-testid": "email-input",
                type: "email",
              }}
              sx={{ mb: 2 }}
            />
            <TextField
              required
              fullWidth
              label="패스워드"
              inputProps={{
                "data-testid": "password-input",
                type: "password",
              }}
              sx={{ mb: 2 }}
            />
            <Button
              data-testid="signin-button"
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{ mt: 1, mb: 2 }}
            >
              로그인
            </Button>
            <Button onClick={handleSignupBtn} size="medium">
              회원가입
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default Main;
