import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Signin from "./components/page/Signin";
import Signup from "./components/page/Signup";

// ----------------------------------------------------------------------
// 라우터 컴포넌트
// ----------------------------------------------------------------------

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signin" />} replace />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default Router;
