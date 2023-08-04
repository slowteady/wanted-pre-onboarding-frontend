import axios from "axios";
import API from "../config/API";

// ----------------------------------------------------------------------
// Todo 관련 서비스
// ----------------------------------------------------------------------

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
    console.error(err);
    const msg = "예상치 못한 문제가 발생했습니다";

    return {
      isSuccess: false,
      msg,
    };
  }
};

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
    console.error(err);
    const msg = "예상치 못한 문제가 발생했습니다";

    return {
      isSuccess: false,
      msg,
    };
  }
};

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
    console.error(err);
    const msg = "예상치 못한 문제가 발생했습니다";

    return {
      isSuccess: false,
      msg,
    };
  }
};
