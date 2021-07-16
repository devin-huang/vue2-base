import { post } from "@/utils/axios.config.js";

export const login = (params) => {
  return post("Admin/v1.0/Login/", params);
};

export const logout = (params) => {
  return post("Admin/v1.0/Logout/", params);
};
