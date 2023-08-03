import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./components/page/Main";
import Signup from "./components/page/Signup";

// ----------------------------------------------------------------------
// 라우터 컴포넌트
// ----------------------------------------------------------------------

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default Router;
