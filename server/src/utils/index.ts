import { CODE, STRINGS } from '../configs/constans'

export function handleResult(
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

export async function MCreate(modal: any, query: any, name: String, data: any) {
    const oldModal = await modal.find(query)
    if (oldModal?.length > 0) {
        return handleResult(`${name} + ' đã tồn tại`, null, CODE.FAIL)
    }
    const db = new modal(data)
    try {
        const modal = await db.save()
        return handleResult(`'Tạo thành công ' + ${name}`, { ...modal })
    } catch (error) {
        return handleResultError(`Tạo thành công' + ${name}`)
    }
}

export async function Mfinds(modal: any, query: any, pages: any) {
    pages = {
        limit: Number(pages.limit),
        index: Number(pages.index),
        total: Number(pages.total),
    }

    const skip = (pages.index - 1) * pages.limit

    try {
        const modals = await modal
            .find(query)
            .skip(skip || null)
            .limit(pages.limit || null)
        if (modals) {
            pages.total = await modal.countDocuments()
            return handleResult(STRINGS.SUCCESS, modals, pages)
        }
    } catch (error) {
        return handleResultError(STRINGS.FAIL)
    }
}

export async function Mfind(modal: any, query: any, name: String) {
    try {
        const modals = await modal.findOne(query)
        if (modals) {
            return handleResult(STRINGS.SUCCESS, modals, CODE.SUCCESS)
        }
    } catch (error) {
        return handleResultError(STRINGS.FAIL)
    }
}
