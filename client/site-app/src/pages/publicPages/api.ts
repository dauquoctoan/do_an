import ApiClient from "../../services";

export function apiCreateUserWithToken(token: string) {
    return ApiClient.post("/save-user-with-token", { token: token });
}

export function apiCreateUser(info: any) {
    return ApiClient.post("/save-user", info);
}

export function apiLogin(info: any) {
    return ApiClient.post("/login", info);
}

export function apiLoginToken(info: any) {
    return ApiClient.post("/login-token", info);
}
