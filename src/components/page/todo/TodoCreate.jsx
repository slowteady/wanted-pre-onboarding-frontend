import { Box, Button, Input } from "@mui/material";
import { useState } from "react";
import { addTodoService } from "../../../service/todoService";

// ----------------------------------------------------------------------
// Todo 생성 컴포넌트
// ----------------------------------------------------------------------

const TodoCreate = ({ onAdd }) => {
  const [value, setValue] = useState("");

  // Todo 입력 시
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
    const response = await addTodoService(body);
    const { isSuccess, msg } = response;

    if (isSuccess) {
      onAdd();
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
