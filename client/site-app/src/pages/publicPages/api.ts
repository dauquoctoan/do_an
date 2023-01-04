import axiosInstance from "../../services";

export function apiLogin(token: string) {
  return axiosInstance.post("/", token);
}
