export const STRINGS = {
    STATUS: {
        SUCCESS: 'thành công',
        FAIL: 'thất bại !',
    },
    METHOD: {
        CREATE: 'Tạo',
        UPDATE: 'Sửa',
        DELETE: 'Xóa',
        FIND: 'Tìm kiếm',
        LOGIN: 'Đăng nhập',
    },
    WARN: {
        EXIST: 'Đã tồn tại',
    },
}

export const STATUS_CODE = {
    OK: 200,
    Created: 201,
    Accepted: 202,
    noContent: 204,
    BadRequest: 400,
    Unauthorized: 401,
    PaymentRequired: 402,
    Forbidden: 403,
    notFound: 404,
    proxyAuthenticationRequired: 407,
    requestTimeout: 408,
    badGateway: 502,
    MethodNotAllowed: 405,
    NotAcceptable: 406,
    ProxyAuthenticationRequired: 407,
    RequestTimeout: 408,
    Conflict: 409,
    Gone: 410,
    LengthRequired: 411,
    PreconditionFailed: 412,
    PayloadTooLarge: 413,
    URITooLong: 414,
    UnsupportedMediaType: 415,
    RangeNotSatisfiable: 416,
    ExpectationFailed: 417,
    ImATeapot: 418,
    MisdirectedRequest: 421,
    UnprocessableEntity: 422,
    Locked: 423,
    FailedDependency: 424,
    TooEarly: 425,
    UpgradeRequired: 426,
    PreconditionRequired: 428,
    TooManyRequests: 429,
    LockRequestHeaderFieldsTooLargeed: 431,
    UnavailableForLegalReasons: 451,
    InternalServerErro: 500,
    NotImplemented: 501,
    BadGateway: 502,
    ServiceUnavailable: 503,
}

export const CODE = {
    SUCCESS: 1,
    FAIL: 0,
}

export const DEFAULT_PAGE = {
    page: 1,
    limit: 24,
}
