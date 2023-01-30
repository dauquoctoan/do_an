import ApiClient from "../services";

export function getTopics(payload: any) {
    return ApiClient.get("/topics", payload);
}

export function getParts(payload: any) {
    return ApiClient.get("/parts", payload);
}

export function getLessonsBuyPart(payload: any) {
    return ApiClient.get("/lessons", payload);
}
