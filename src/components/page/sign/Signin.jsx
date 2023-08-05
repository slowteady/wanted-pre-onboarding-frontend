import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signinService } from "../../../service/signService";

// ----------------------------------------------------------------------
// 로그인 페이지 컴포넌트
// ----------------------------------------------------------------------

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPwValid, setIsPwValid] = useState(false);
  const navigate = useNavigate();

  const handleEmailInput = (e) => {
    setEmail(e.currentTarget.value);
    setIsEmailValid(e.currentTarget.value.includes("@"));
  };

  const handlePwInput = (e) => {
    setPassword(e.currentTarget.value);
    setIsPwValid(e.currentTarget.value.length >= 8);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    let body = {
      email,
      password,
    };

    // 가입 요청
    const response = await signinService(body);
    const { isSuccess, msg } = response;

    // 로그인 후처리
    if (isSuccess) {
      navigate("/todo");
    } else {
      alert(msg);
      return;
    }
  };

  const handleSignupBtn = () => {
    navigate("/signup");
  };

  return (
    <Container
      sx={{ height: "80vh", display: "flex", justifyContent: "center" }}
    >
      <Box
        sx={{
          m: 20,
          width: "540px",
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          sx={{ mb: 3, textAlign: "center" }}
        >
          로그인
        </Typography>
        <form onSubmit={handleFormSubmit}>
          <TextField
            onChange={handleEmailInput}
            value={email}
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
            onChange={handlePwInput}
            value={password}
            required
            fullWidth
            label="패스워드(8자 이상)"
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
            disabled={!isEmailValid || !isPwValid}
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
  );
};

export default Signin;
