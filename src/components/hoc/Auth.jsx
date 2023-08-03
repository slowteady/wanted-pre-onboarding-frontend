import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

// ----------------------------------------------------------------------
// 사용자 로그인 검증 컴포넌트
// ----------------------------------------------------------------------

// 일반 페이지 토큰 검증
export const Auth = ({ children }) => {
  const [isInit, setIsInit] = useState(true);
  const [isValid, setIsValid] = useState(false);

  // 토큰 검증
  useEffect(() => {
    const access_token = localStorage.getItem("JWT");

    if (access_token) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    setIsInit(false);
  }, []);

  if (isInit) {
    return <></>;
  } else if (isValid) {
    return <>{children}</>;
  } else {
    return <Navigate to="/signin" replace />;
  }
};

// 로그인/회원가입 페이지 토큰 검증
export const SignAuth = ({ children }) => {
  const [isInit, setIsInit] = useState(true);
  const [isValid, setIsValid] = useState(false);

  // 토큰 검증
  useEffect(() => {
    const access_token = localStorage.getItem("JWT");

    if (access_token) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    setIsInit(false);
  }, []);

  if (isInit) {
    return <></>;
  } else if (isValid) {
    return <Navigate to="/todo" />;
  } else {
    return <>{children}</>;
  }
};
