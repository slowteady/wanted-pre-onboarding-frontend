# 코드리뷰용 소스 가이드

## 파일 구조

```bash
📦 src
 ┣ 📂 components
 ┃ ┣ 📂 hoc
 ┃ ┃ ┗ Auth.jsx // 토큰 유무를 검증하여 리다이렉트 처리하는 hoc
 ┃ ┣ 📂 page
 ┃ ┃ ┣ 📂 sign
 ┃ ┃ ┃ ┣ Signin.jsx // 회원가입 
 ┃ ┃ ┃ ┗ Signup.jsx // 로그인
 ┃ ┃ ┣ 📂 todo
 ┃ ┃ ┃ ┣ TodoCreate.jsx // Todo 생성
 ┃ ┃ ┃ ┣ TodoIndex.jsx // Todo 인덱스
 ┃ ┃ ┃ ┣ TodoItems.jsx // Todo 행
 ┃ ┃ ┃ ┣ TodoLayout.jsx // Todo 레이아웃
 ┃ ┃ ┃ ┗ TodoList.jsx // TodoItems props 관리를 위한 리스트
 ┣ 📂 config
 ┃ ┗ API.js // API 정보 관리
 ┣ 📂 service
 ┃ ┣ signService.js // 로그인, 회원가입 관련 http 요청 전후 처리
 ┃ ┗ todoService.js // Todo 리스트 관련 http 요청 전후 처리
 ┣ App.jsx
 ┣ index.jsx
 ┗ Router.jsx
```

## 기능

### 1. 회원가입

#### 요구사항

- 이메일 조건: "@" 포함
- 비밀번호 조건: 8자 이상
- 유효성 검사 통과하지 못할 시 button disabled 처리
- 회원가입 완료 시 /signin 경로로 이동

```javascript
# Signup.jsx

import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupService } from "../../../service/signService";

// ----------------------------------------------------------------------
// 회원가입 페이지 컴포넌트
// ----------------------------------------------------------------------

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPwValid, setIsPwValid] = useState(false); 
  const navigate = useNavigate();

  const handleEmailInput = (e) => {
    setEmail(e.currentTarget.value);
    setIsEmailValid(e.currentTarget.value.includes("@")); // 이메일 "@" 포함 여부 체크하여 state 변경
  };

  const handlePwInput = (e) => {
    setPassword(e.currentTarget.value);
    setIsPwValid(e.currentTarget.value.length >= 8); // 패스워드 8자 이상 여부 체크하여 state 변경
  };

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
      navigate("/signin"); // 회원가입 완료 시 /signin 경로 이동
    } else {
      alert(msg);
      return;
    }
  };

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
            disabled={!isEmailValid || !isPwValid} // 유효성 검사 통과 시 false로 변경되어 버튼 활성화
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

```

```javascript
# signService.js

// 회원가입 요쳥
export const signupService = async (body) => {
  try {
    const response = await axios.post(
      `${API.PRE_ONBOARDING_API_URL}${API.SIGN_UP}`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const { status } = response;
    let isSuccess = false;

    // 가입 성공
    if (status === 201) {
      isSuccess = true;
    }

    return { isSuccess, msg: "가입을 축하합니다" };
  } catch (err) { 
    // 가입 실패 예외 처리
    console.error(err);
    let msg = "예상치 못한 문제가 발생했습니다";

    if (err.response.data.statusCode === 400 && err.response.data.message) {
      msg = err.response.data.message;
    }

    return {
      isSuccess: false,
      msg,
    };
  }
};

```

### 2. 로그인

#### 요구사항

- 이메일 조건: "@" 포함
- 비밀번호 조건: 8자 이상
- 유효성 검사 통과하지 못할 시 button disabled 처리
- 로그인 성공 시 리턴되는 JWT 토큰을 localStorage에 저장
- 로그인 성공 시 /todo 경로로 이동

```javascript
# Signin.jsx

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
    setIsEmailValid(e.currentTarget.value.includes("@")); // 이메일 "@" 포함 여부 체크하여 state 변경
  };

  const handlePwInput = (e) => {
    setPassword(e.currentTarget.value);
    setIsPwValid(e.currentTarget.value.length >= 8); // 패스워드 8자 이상 여부 체크하여 state 변경
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
      navigate("/todo"); // 로그인 성공 시 /todo 경로 이동
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
            disabled={!isEmailValid || !isPwValid} // 유효성 검사 통과 시 false로 변경되어 버튼 활성화
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

```

```javascript
# signService.js

// 로그인 요쳥
export const signinService = async (body) => {
  try {
    const response = await axios.post(
      `${API.PRE_ONBOARDING_API_URL}${API.SIGN_IN}`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const { status } = response;
    const { access_token } = response.data;
    let isSuccess = false;

    // 로그인 성공
    if (status === 200) {
      isSuccess = true;
    }

    // 로컬스토리지에 토큰 저장
    if (access_token) {
      localStorage.setItem("JWT", access_token);
    }

    return { isSuccess };
  } catch (err) {
    // 실패 시 예외 처리
    console.error(err);
    let msg = "예상치 못한 문제가 발생했습니다";

    if (
      err.response.data.statusCode === 401 &&
      err.response.data.message === "Unauthorized"
    ) {
      msg = "비밀번호가 틀렸습니다";
    }

    return {
      isSuccess: false,
      msg,
    };
  }
};
```

### 3. Todo 리스트 CRUD

#### 요구사항

- 목록에서는 Todo 내용과 완료 여부 표시 되어야함
- Todo의 완료 여부는 input type="checkbox" 통해 표현
- Todo 체크박스를 통해 완료 여부 수정
- Todo는 li 태그를 이용해 감싸야함
- 수정 버튼 클릭 시 수정모드 활성화 되면서 수정, 삭제 버튼이 제출, 취소 버튼으로 변경
- 제출버튼을 누르면 수정한 내용을 제출해서 내용이 업데이트
- 취소버튼을 누르면 수정한 내용을 초기화 하고, 수정모드 비활성화

```javascript
# TodoCreate.jsx

import { Box, Button, Input } from "@mui/material";
import { useState } from "react";
import { addTodoService } from "../../../service/todoService";

// ----------------------------------------------------------------------
// Todo 생성 컴포넌트
// ----------------------------------------------------------------------

const TodoCreate = ({ onAdd }) => {
  const [value, setValue] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // 빈값 방지
    if (value.trim() === "") {
      alert("할 일을 입력해주세요");
      return;
    }

    const body = {
      todo: value,
    };
    // Todo 추가 요청
    const response = await addTodoService(body);
    const { isSuccess, msg } = response;

    if (isSuccess) {
      onAdd(); // 추가 성공 시 TodoIndex.jsx의 getTodoData 함수 실행
      setValue("");
    } else {
      alert(msg);
      return;
    }
  };

  const handleInputChange = (e) => {
    setValue(e.currentTarget.value);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <Box sx={{ display: "flex" }}>
        <Input
          onChange={handleInputChange}
          value={value}
          autoFocus
          fullWidth
          placeholder=" 할 일을 입력해주세요"
          sx={{ mr: 1 }}
          inputProps={{
            "data-testid": "new-todo-input",
          }}
        />
        <Button
          variant="contained"
          type="submit"
          data-testid="new-todo-add-button"
        >
          추가
        </Button>
      </Box>
    </form>
  );
};

export default TodoCreate;
```

```javascript
# todoService.js

// Todo 추가 요청
export const addTodoService = async (body) => {
  try {
    const access_token = localStorage.getItem("JWT");
    const response = await axios.post(
      `${API.PRE_ONBOARDING_API_URL}${API.TODOS}`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const { status, data } = response;
    let isSuccess = false;

    // Todo 추가 성공
    if (status === 201) {
      isSuccess = true;
    }

    return { isSuccess, data };
  } catch (err) {
    // 실패 시 예외 처리
    console.error(err);
    const msg = "예상치 못한 문제가 발생했습니다";

    return {
      isSuccess: false,
      msg,
    };
  }
};

```

```javascript
# TodoIndex.jsx

import React, { useEffect, useState } from "react";
import { getTodoService } from "../../../service/todoService";
import TodoCreate from "./TodoCreate";
import TodoLayout from "./TodoLayout";
import TodoList from "./TodoList";

// ----------------------------------------------------------------------
// Todo 인덱스 페이지 컴포넌트
// ----------------------------------------------------------------------

const TodoIndex = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodoData(); 
  }, []);

  // 저장한 Todo 데이터 요청
  const getTodoData = async () => {
    const response = await getTodoService();
    const { isSuccess, msg, data } = response;

    if (isSuccess) {
      setTodos(data);
    } else {
      alert(msg);
      return;
    }
  };

  return (
    <TodoLayout>
      // getTodoData 함수를 props로 내려주어 add, edit, delete 실행 시 동작하도록 구현
      <TodoList todos={todos} onEdit={getTodoData} onDelete={getTodoData} />
      <TodoCreate onAdd={getTodoData} />
    </TodoLayout>
  );
};

export default TodoIndex;

```

```javascript
# todoService.js

// Todo 리스트 요청
export const getTodoService = async () => {
  try {
    const access_token = localStorage.getItem("JWT");
    const response = await axios.get(
      `${API.PRE_ONBOARDING_API_URL}${API.TODOS}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const { status, data } = response;
    let isSuccess = false;

    // Todo Load 성공
    if (status === 200) {
      isSuccess = true;
    }

    return { isSuccess, data };
  } catch (err) {
    // 실패 시 예외 처리
    console.error(err);
    const msg = "예상치 못한 문제가 발생했습니다";

    return {
      isSuccess: false,
      msg,
    };
  }
};
```

```javascript
# TodoList.jsx

import { Box, List, Typography } from "@mui/material";
import React from "react";
import TodoItems from "./TodoItems";

// ----------------------------------------------------------------------
// Todo 리스트 컴포넌트
// ----------------------------------------------------------------------

const TodoList = ({ todos, onEdit, onDelete }) => {
  return (
    <>
      <Typography
        component="h1"
        variant="h5"
        sx={{ mb: 3, textAlign: "center" }}
      >
        Todo
      </Typography>
      <Box sx={{ flex: 1, overflowY: "auto", mb: 3 }}>
        <List>
        // Todo state를 map 함수 이용하여 TodoItems 자식 컴포넌트에게 props 전달
          {todos.map((t) => {
            const { id, isCompleted, todo } = t;
            return (
              <TodoItems
                key={id}
                id={id}
                text={todo}
                isCompleted={isCompleted}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            );
          })}
        </List>
      </Box>
    </>
  );
};

export default TodoList;

```

```javascript
# TodoItems.jsx

import { Box, Button, Input, styled } from "@mui/material";
import React, { useState } from "react";
import {
  deleteTodoService,
  editTodoService,
} from "../../../service/todoService";

// ----------------------------------------------------------------------
// Todo 아이템 컴포넌트
// ----------------------------------------------------------------------

const Li = styled("li")({
  margin: "10px 0",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
});

const Label = styled("label")({
  display: "inline-block",
});

const TodoItems = ({ id, isCompleted, text, onEdit, onDelete }) => { // isCompleted: Todo 완료 여부
  const [checked, setChecked] = useState(isCompleted);
  const [isEdit, setIsEdit] = useState(false);
  const [inputText, setInputText] = useState(text);

  // 수정 요청 함수
  const editFunction = async (body) => {
    const response = await editTodoService(id, body);
    const { isSuccess, msg } = response;

    if (isSuccess) {
      setIsEdit(false);
      onEdit(); // 수정 성공 시 TodoIndex.jsx의 getTodoData 함수 실행
    } else {
      alert(msg);
      return;
    }
  };

  // 체크 박스 클릭 시
  const handleChkBoxChange = (e) => {
    const isChecked = e.currentTarget.checked;
    setChecked(isChecked);

    const body = {
      todo: inputText,
      isCompleted: isChecked,
    };
    // Todo 수정 요청
    editFunction(body);
  };

  // 수정 버튼 클릭 시 
  const handleEditBtn = () => {
    setIsEdit(true);
  };

  // 삭제 버튼 클릭 시
  const handleDeleteBtn = async () => {
    // Todo 삭제 요청
    const response = await deleteTodoService(id);
    const { isSuccess, msg } = response;

    if (isSuccess) {
      onDelete(); // 삭제 성공 시 TodoIndex.jsx의 getTodoData 함수 실행
    } else {
      alert(msg);
      return;
    }
  };

  // 엔터 클릭 시에도 입력
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmitBtn();
    }
  };

  // 수정 버튼 클릭
  const handleSubmitBtn = async () => {
    const body = {
      todo: inputText,
      isCompleted,
    };
    // Todo 수정 요청
    editFunction(body);
  };

  const handleCancelBtn = () => {
    setIsEdit(false);
    setInputText(text);
  };

  return (
    <Li>
      {isEdit ? (
        <>
          <Label>
            <input
              type="checkbox"
              onChange={handleChkBoxChange}
              checked={checked}
            />
            <Input
              value={inputText}
              onKeyDown={handleKeyDown}
              onChange={(e) => setInputText(e.currentTarget.value)}
              sx={{ pl: 1, width: "300px" }}
              inputProps={{
                "data-testid": "modify-input",
              }}
            />
          </Label>
          <Box sx={{ display: "inline-block" }}>
            <Button
              onClick={handleSubmitBtn}
              variant="contained"
              size="small"
              data-testid="submit-button"
              sx={{ m: 1 }}
            >
              제출
            </Button>
            <Button
              onClick={handleCancelBtn}
              variant="contained"
              size="small"
              data-testid="cancel-button"
              color="error"
            >
              취소
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Label>
            <input
              type="checkbox"
              onChange={handleChkBoxChange}
              checked={checked}
            />
            <span style={{ paddingLeft: "8px" }}>{text}</span>
          </Label>
          <Box sx={{ display: "inline-block" }}>
            <Button
              onClick={handleEditBtn}
              variant="contained"
              size="small"
              data-testid="modify-button"
              sx={{ m: 1 }}
            >
              수정
            </Button>
            <Button
              onClick={handleDeleteBtn}
              variant="contained"
              size="small"
              data-testid="delete-button"
              color="error"
            >
              삭제
            </Button>
          </Box>
        </>
      )}
    </Li>
  );
};

export default TodoItems;

```

```javascript
# todoService.js

// Todo 리스트 수정 요청
export const editTodoService = async (id, body) => {
  try {
    const access_token = localStorage.getItem("JWT");
    const response = await axios.put(
      `${API.PRE_ONBOARDING_API_URL}${API.TODOS}/${id}`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const { status } = response;
    let isSuccess = false;

    // Todo 수정 성공
    if (status === 200) {
      isSuccess = true;
    }

    return { isSuccess };
  } catch (err) {
    // 실패 시 예외 처리
    console.error(err);
    const msg = "예상치 못한 문제가 발생했습니다";

    return {
      isSuccess: false,
      msg,
    };
  }
};

// Todo 리스트 삭제 요청
export const deleteTodoService = async (id) => {
  try {
    const access_token = localStorage.getItem("JWT");
    const response = await axios.delete(
      `${API.PRE_ONBOARDING_API_URL}${API.TODOS}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const { status } = response;
    let isSuccess = false;

    // Todo 삭제 성공
    if (status === 204) {
      isSuccess = true;
    }

    return { isSuccess };
  } catch (err) {
    // 실패 시 예외 처리
    console.error(err);
    const msg = "예상치 못한 문제가 발생했습니다";

    return {
      isSuccess: false,
      msg,
    };
  }
};

```

### 4. 리다이렉트 라우팅

#### 요구사항

- /todo 경로 접속 시 Todo 리스트 목록 출력
- 토큰 있는 상태로 /signin, /signup 접속 시 /todo 경로로 리다이렉트 처리
- 토큰 없이 /todo 페이지 접속 시 /signin 경로로 리다이렉트 처리

```javascript
# Router.jsx

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
    // root 경로 접속 시 signin으로 리다이렉트, 뒤로가기 방지하도록 replace 처리
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

```

```javascript
# Auth.jsx

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
    return <></>; // 깜빡임 방지
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
    return <></>; // 깜빡임 방지
  } else if (isValid) {
    return <Navigate to="/todo" />;
  } else {
    return <>{children}</>;
  }
};

```
