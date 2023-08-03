import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "./components/hoc/Auth";
import Signin from "./components/page/Signin";
import Signup from "./components/page/Signup";

// ----------------------------------------------------------------------
// 라우터 컴포넌트
// ----------------------------------------------------------------------

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signin" />} replace />
      <Route
        path="/signin"
        element={
          <Auth isException={true}>
            <Signin />
          </Auth>
        }
      />
      <Route
        path="/signup"
        element={
          <Auth isException={true}>
            <Signup />
          </Auth>
        }
      />
    </Routes>
  );
};

export default Router;
