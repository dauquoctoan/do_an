import { CODE, STRINGS } from '../configs/constans'

export function handleResultSuccess(
    message: string,
    data: any,
    page: any = {
        limit: 24,
        index: 1,
        total: 1,
    }
) {
    return {
        code: 1,
        data: data,
        message: message,
        page: page,
    }
}

export function handleResultError(message: string) {
    return {
        code: 0,
        message: message,
    }
}

function defaultCreateSuccess(name: string) {
    return `${STRINGS.METHOD.CREATE} ${name} ${STRINGS.STATUS.SUCCESS}`
}

function defaultCreateFail(name: string) {
    return `${STRINGS.METHOD.CREATE} ${name} ${STRINGS.STATUS.FAIL}`
}
function defaultCreateFailExist(name: string) {
    return `${STRINGS.WARN.EXIST} ${name}`
}

function defaultUpdateSuccess(name: string) {
    return `${STRINGS.METHOD.UPDATE} ${name} ${STRINGS.STATUS.SUCCESS}`
}

function defaultUpdateFail(name: string) {
    return `${STRINGS.METHOD.UPDATE} ${name} ${STRINGS.STATUS.FAIL}`
}

function defaultDeleteSuccess(name: string) {
    return `${STRINGS.METHOD.DELETE} ${name} ${STRINGS.STATUS.SUCCESS}`
}

function defaultDeleteFail(name: string) {
    return `${STRINGS.METHOD.DELETE} ${name} ${STRINGS.STATUS.FAIL}`
}

function defaultFindSuccess(name: string) {
    return `${STRINGS.METHOD.FIND} ${name} ${STRINGS.STATUS.SUCCESS}`
}

function defaultFindFail(name: string) {
    return `${STRINGS.METHOD.FIND} ${name} ${STRINGS.STATUS.FAIL}`
}

function defaultLoginSuccess(name: string) {
    return `${STRINGS.METHOD.LOGIN} ${name} ${STRINGS.STATUS.SUCCESS}`
}

function defaultLoginFail(name: string) {
    return `${STRINGS.METHOD.LOGIN} ${name} ${STRINGS.STATUS.FAIL}`
}

export const createMessage = {
    createSuccess: (name: string) => {
        return defaultCreateSuccess(name)
    },
    createFail: (name: string) => {
        return defaultCreateFail(name)
    },
    createFailExist: (name: string) => {
        return defaultCreateFailExist(name)
    },
    updateSuccess: (name: string) => {
        return defaultUpdateSuccess(name)
    },
    updateFail: (name: string) => {
        return defaultUpdateFail(name)
    },
    deleteSuccess: (name: string) => {
        return defaultDeleteSuccess(name)
    },
    deleteFail: (name: string) => {
        return defaultDeleteFail(name)
    },
    findSuccess: (name: string) => {
        return defaultFindSuccess(name)
    },
    findFail: (name: string) => {
        return defaultFindFail(name)
    },
    loginSuccess: (name: string) => {
        return defaultLoginSuccess(name)
    },
    loginFail: (name: string) => {
        return defaultLoginFail(name)
    },
}
