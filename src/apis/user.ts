import errorHandle from "./ErrorHandle";
import Api from "./api";
import store from "../Store/store";




Api.interceptors.request.use(
  (config) => {


    // const token = localStorage.getItem("token");
    const state = store.getState();
    console.log(state.auth.token)
    const token = state.auth.token
    if (token) {
      config.headers["Authorization"] = `${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


type User = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export const signUp = async (userDetails: User) => {
  try {
    const res = await Api.post("/api/users/register", userDetails);
    return res;
  } catch (error) {
    console.log(error);
    errorHandle(error as Error);
  }
};

export const signIn = async (userDetails: User) => {
  try {
    const res = await Api.post("/api/users", userDetails);
    return res;
  } catch (error) {
    console.log(error);
    errorHandle(error as Error);
  }
};

export const verifyOtp = async (otp: string) => {
  try {
    const res = await Api.post("/api/users/verifyOtp", { otp });
    return res;
  } catch (error) {
    errorHandle(error as Error);
    console.log(error);
  }
};

export const changePassword = async (password: string, newPassword: string) => {
  try {
    const res = await Api.post("/api/users/changePassword", {
      password,
      newPassword,
    });
    return res;
  } catch (error) {
    errorHandle(error as Error);
  }
};

export const userData = async () => {
  try {
    const res = await Api.get("/api/users/home");
    return res;
  } catch (error) {
    errorHandle(error as Error);
  }
};
