import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupService } from "../../../service/authService";

// ----------------------------------------------------------------------
// 회원가입 페이지 컴포넌트
// ----------------------------------------------------------------------

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPwValid, setIsPwValid] = useState(false);
  const navigate = useNavigate();

  // 이메일 Input 핸들링
  const handleEmailInput = (e) => {
    setEmail(e.currentTarget.value);
    setIsEmailValid(e.currentTarget.value.includes("@"));
  };

  // 패스워드 Input 핸들링
  const handlePwInput = (e) => {
    setPassword(e.currentTarget.value);
    setIsPwValid(e.currentTarget.value.length >= 8);
  };

  // 회원가입 버튼
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    let body = {
      email,
      password,
    };

    // 가입 요청
    const response = await signupService(body);
    const { isSuccess, msg } = response;

    // 가입 후처리
    if (isSuccess) {
      alert(msg);
      navigate("/signin");
    } else {
      alert(msg);
      return;
    }
  };

  // 취소 버튼
  const handleCancelBtn = () => {
    navigate("/signin");
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
          회원가입
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
            value={password}
            onChange={handlePwInput}
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
            data-testid="signup-button"
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={!isEmailValid || !isPwValid}
            sx={{ mt: 1, mb: 2 }}
          >
            회원가입
          </Button>
        </form>
        <Button
          onClick={handleCancelBtn}
          variant="contained"
          size="large"
          fullWidth
          sx={{
            backgroundColor: "#c97c63",
            "&:hover": {
              backgroundColor: "#ab6e59",
            },
          }}
        >
          취소
        </Button>
      </Box>
    </Container>
  );
};

export default Signup;
