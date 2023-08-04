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

  // Todo 추가
  const handleAdd = () => {
    getTodoData();
  };

  // Todo 데이터 요청
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
      <TodoList todos={todos} />
      <TodoCreate onAdd={handleAdd} />
    </TodoLayout>
  );
};

export default TodoIndex;
