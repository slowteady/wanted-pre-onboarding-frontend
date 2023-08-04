import { Button } from "@mui/material";
import React, { useState } from "react";

// ----------------------------------------------------------------------
// Todo 아이템 컴포넌트
// ----------------------------------------------------------------------

const TodoItems = ({ id, isCompleted, text }) => {
  const [checked, setChecked] = useState(false);

  const handleChkBoxChange = (e) => {
    setChecked(e.currentTarget.checked);
  };

  return (
    <li style={{ width: "100%", margin: "10px 0" }}>
      <label>
        <input
          type="checkbox"
          onChange={handleChkBoxChange}
          checked={checked}
        />
        <span>{text}</span>
        <Button variant="contained" size="small" sx={{ m: 1 }}>
          수정
        </Button>
        <Button variant="contained" size="small" color="error">
          삭제
        </Button>
      </label>
    </li>
  );
};

export default TodoItems;
