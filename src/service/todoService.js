import axios from "axios";
import API from "../config/API";

// ----------------------------------------------------------------------
// TODO 관련 서비스
// ----------------------------------------------------------------------

// TODO 추가 요청
export const addTodoService = async (body) => {
  try {
    const access_token = localStorage.getItem("JWT");
    const response = await axios.post(
      `${API.PRE_ONBOARDING_API_URL}${API.ADD_TODOS}`,
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

    // TODO 추가 성공
    if (status === 201) {
      isSuccess = true;
    }

    return { isSuccess, payload: data };
  } catch (err) {
    console.error(err);
    const msg = "예상치 못한 문제가 발생했습니다";

    return {
      isSuccess: false,
      msg,
    };
  }
};
