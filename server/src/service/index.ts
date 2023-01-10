import { CODE, STRINGS } from '../configs/constans'
import { createMessage, handleResultError, handleResultSuccess } from '../utils'

export async function MCreate(
    modal: any,
    query: any,
    name: string = 'đối tượng',
    data: any
) {
    const oldModal = await modal.find(query)
    if (oldModal?.length > 0) {
        return handleResultError(createMessage.createFailExist(name))
    }
    const db = new modal(data)
    try {
        const modal = await db.save()
        return handleResultSuccess(createMessage.createSuccess(name), {
            ...modal._doc,
        })
    } catch (error) {
        return handleResultError(createMessage.createFail(name))
    }
}
export async function Mfinds(
    modal: any,
    query: any,
    name: string = 'đối tượng',
    pages: { limit: number; index: number } = {
        limit: 24,
        index: 1,
    }
) {
    console.log(typeof pages.index)
    const skip = (pages.index - 1) * pages.limit

    try {
        const modals = await modal
            .find(query)
            .skip(skip || null)
            .limit(pages.limit || null)
        if (modals) {
            const total = await modal.countDocuments()
            return handleResultSuccess(
                createMessage.findSuccess(name),
                modals,
                { ...pages, total: total }
            )
        }
    } catch (error) {
        return handleResultError(createMessage.findFail(name) + ':' + error)
    }
}
export async function Mfind(modal: any, query: any, name: string) {
    try {
        const modals = await modal.findOne(query)
        if (modals) {
            return handleResultSuccess(
                createMessage.findSuccess(name),
                modals,
                CODE.SUCCESS
            )
        }
    } catch (error) {
        return handleResultError(createMessage.findFail(name))
    }
}
