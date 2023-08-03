import axios from "axios";
import API from "../config/API";

// ----------------------------------------------------------------------
// 사용자 관련 서비스
// ----------------------------------------------------------------------

// 회원가입 요쳥
export const signupService = async (body) => {
  try {
    const response = await axios.post(
      `${API.PRE_ONBOARDING_API_URL}${API.SIGN_UP}`,
      body
    );
    const { status } = response;
    let isSuccess = false;

    // 가입 성공
    if (status === 201) {
      isSuccess = true;
    }

    return { isSuccess, msg: "가입을 축하합니다" };
  } catch (err) {
    console.error(err);
    let msg = "예상치 못한 문제가 발생했습니다";

    if (err.response.data.statusCode === 400 && err.response.data.message) {
      msg = err.response.data.message;
    }

    return {
      isSuccess: false,
      msg,
    };
  }
};

// 로그인 요쳥
export const signinService = async (body) => {
  try {
    const response = await axios.post(
      `${API.PRE_ONBOARDING_API_URL}${API.SIGN_IN}`,
      body
    );
    const { status } = response;
    const { access_token } = response.data;
    let isSuccess = false;

    // 로그인 성공
    if (status === 200) {
      isSuccess = true;
    }

    // 로컬스토리지에 토큰 저장
    if (access_token) {
      localStorage.setItem("JWT", access_token);
    }

    return { isSuccess };
  } catch (err) {
    console.error(err);
    let msg = "예상치 못한 문제가 발생했습니다";

    if (
      err.response.data.statusCode === 401 &&
      err.response.data.message === "Unauthorized"
    ) {
      msg = "비밀번호가 틀렸습니다";
    }

    return {
      isSuccess: false,
      msg,
    };
  }
};
