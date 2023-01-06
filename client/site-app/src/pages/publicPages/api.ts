import axiosInstance from "../../services";

export function apiLogin(token: string) {
    return axiosInstance.post("/auth/save-user-with-token", { token: token });
}
