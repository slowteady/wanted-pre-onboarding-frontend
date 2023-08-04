import React from "react";
import { TodoProvider } from "../../state/todo/Context";
import TodoCreate from "./TodoCreate";
import TodoLayout from "./TodoLayout";
import TodoList from "./TodoList";

// ----------------------------------------------------------------------
// TODO 인덱스 페이지 컴포넌트
// ----------------------------------------------------------------------

const TodoIndex = () => {
  return (
    <TodoProvider>
      <TodoLayout>
        <TodoList />
        <TodoCreate />
      </TodoLayout>
    </TodoProvider>
  );
};

export default TodoIndex;
