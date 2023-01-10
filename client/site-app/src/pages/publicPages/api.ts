import ApiClient from "../../services";

export function apiCreateUserWithToken(token: string) {
    return ApiClient.post("/auth/save-user-with-token", { token: token });
}

export function apiCreateUser(info: any) {
    return ApiClient.post("/auth/save-user", info);
}

export function apiLogin(info: any) {
    return ApiClient.post("/auth/login", info);
}
