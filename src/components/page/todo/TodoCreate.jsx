import { Box, Button, Input } from "@mui/material";
import { useContext, useState } from "react";
import { addTodoService } from "../../../service/todoService";
import { TodoDispatchContext } from "../../state/todo/Context";

// ----------------------------------------------------------------------
// TODO 생성 컴포넌트
// ----------------------------------------------------------------------

const TodoCreate = () => {
  const dispatch = useContext(TodoDispatchContext);
  const [value, setValue] = useState("");

  // TODO 입력 시
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const body = {
      todo: value,
    };
    const response = addTodoService(body);
    const { isSuccess, msg } = response;

    if (isSuccess) {
      dispatch({
        type: "CREATE",
        todo: value,
      });
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
        />
        <Button variant="contained">추가</Button>
      </Box>
    </form>
  );
};

export default TodoCreate;
