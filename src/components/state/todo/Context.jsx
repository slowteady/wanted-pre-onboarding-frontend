import { useReducer, useRef } from "react";
const { createContext } = require("react");

// ----------------------------------------------------------------------
// TODO STATE 관리 컴포넌트
// ----------------------------------------------------------------------

// TODO 리듀서
const todoReducer = (state, action) => {
  switch (action.type) {
    case "CREATE":
      return [...state, action.todo];
    default:
      throw new Error();
  }
};

// 전역 STATE로 관리하기 위한 Context, Provider 생성
export const TodoArrContext = createContext();
export const TodoDispatchContext = createContext();
export const TodoIdContext = createContext();

export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, []);
  const id = useRef(0);

  return (
    <TodoArrContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoIdContext.Provider value={id}>{children}</TodoIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoArrContext.Provider>
  );
};
