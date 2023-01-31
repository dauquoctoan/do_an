import ApiClient from "../services";

export function getTopics(payload: any) {
    return ApiClient.get("/site/topics", payload);
}

export function getParts(payload: any) {
    return ApiClient.get("/site/parts", payload);
}

export function getLessonsBuyPart(payload: any) {
    return ApiClient.get("/site/lessons", payload);
}
