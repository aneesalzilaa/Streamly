import { axios_api } from "../lib/axios";

export const loginPost = (data) => {
  return axios_api.post("/auth/login", data);
};


export const signupPost = (data) => {
  return axios_api.post("/auth/signup", data, { withCredentials: true });
};

export const onboarding = (data) =>{
    return axios_api.post("/auth/onboarding", data, { withCredentials: true });
}

export const logoutPost = () => {
  return axios_api.post("/auth/logout", {}, { withCredentials: true });
};