import { Button, Input } from "@mui/material";
import React, { useState } from "react";
import {
  deleteTodoService,
  editTodoService,
} from "../../../service/todoService";

// ----------------------------------------------------------------------
// Todo 아이템 컴포넌트
// ----------------------------------------------------------------------

const TodoItems = ({ id, isCompleted, text, onEdit, onDelete }) => {
  const [checked, setChecked] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [inputText, setInputText] = useState(text);

  const handleChkBoxChange = (e) => {
    setChecked(e.currentTarget.checked);

    onEdit();
  };

  // 수정 버튼 클릭
  const handleEditBtn = () => {
    setIsEdit(true);
  };

  // 삭제 버튼 클릭
  const handleDeleteBtn = async () => {
    const response = await deleteTodoService(id);
    const { isSuccess, msg } = response;

    if (isSuccess) {
      onDelete();
    } else {
      alert(msg);
      return;
    }
  };

  // 제출 버튼 클릭
  const handleSubmitBtn = async () => {
    const body = {
      todo: inputText,
      isCompleted,
    };
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

  // 취소 버튼 클릭
  const handleCancelBtn = () => {
    setIsEdit(false);
    setInputText(text);
  };

  return (
    <li style={{ width: "100%", margin: "10px 0" }}>
      <label>
        <input
          type="checkbox"
          onChange={handleChkBoxChange}
          checked={checked}
        />
        {isEdit ? (
          <>
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.currentTarget.value)}
            />
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
          </>
        ) : (
          <>
            <span>{text}</span>
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
          </>
        )}
      </label>
    </li>
  );
};

export default TodoItems;
