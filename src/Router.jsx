import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Auth, SignAuth } from "./components/hoc/Auth";
import Signin from "./components/page/sign/Signin";
import Signup from "./components/page/sign/Signup";
import TodoIndex from "./components/page/todo/TodoIndex";

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
          <SignAuth>
            <Signin />
          </SignAuth>
        }
      />
      <Route
        path="/signup"
        element={
          <SignAuth>
            <Signup />
          </SignAuth>
        }
      />
      <Route
        path="/todo"
        element={
          <Auth>
            <TodoIndex />
          </Auth>
        }
      />
    </Routes>
  );
};

export default Router;
