import { Box, List, Typography } from "@mui/material";
import React from "react";
import TodoItems from "./TodoItems";

// ----------------------------------------------------------------------
// Todo 리스트 컴포넌트
// ----------------------------------------------------------------------

const TodoList = ({ todos }) => {
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
          {todos.map((t) => {
            const { id, isCompleted, todo } = t;
            return (
              <TodoItems
                key={id}
                id={id}
                text={todo}
                isCompleted={isCompleted}
              />
            );
          })}
        </List>
      </Box>
    </>
  );
};

export default TodoList;
