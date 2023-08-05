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

const TodoItems = ({ id, isCompleted, text, onEdit, onDelete }) => {
  const [checked, setChecked] = useState(isCompleted);
  const [isEdit, setIsEdit] = useState(false);
  const [inputText, setInputText] = useState(text);

  const handleChkBoxChange = (e) => {
    setChecked(e.currentTarget.checked);
  };

  const handleEditBtn = () => {
    setIsEdit(true);
  };

  const handleDeleteBtn = async () => {
    // Todo 삭제 요청
    const response = await deleteTodoService(id);
    const { isSuccess, msg } = response;

    if (isSuccess) {
      onDelete();
    } else {
      alert(msg);
      return;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmitBtn();
    }
  };

  const handleSubmitBtn = async () => {
    const body = {
      todo: inputText,
      isCompleted: checked,
    };
    // Todo 수정 요청
    const response = await editTodoService(id, body);
    const { isSuccess, msg } = response;

    if (isSuccess) {
      setIsEdit(false);
      onEdit();
    } else {
      alert(msg);
      return;
    }
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
