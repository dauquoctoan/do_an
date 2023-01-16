import { CODE, DEFAULT_PAGE, STRINGS } from '../configs/constants'

import {
    createMessage,
    handleResultError,
    handleResultSuccessNoPage,
    handleResultSuccess,
} from '../utils'

export async function _Create(
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
        return handleResultSuccessNoPage(createMessage.createSuccess(name), {
            ...modal._doc,
        })
    } catch (error) {
        return handleResultError(createMessage.createFail(name))
    }
}

export async function _Creates(
    modal: any,
    name: string = 'đối tượng',
    data: any
) {
    const db = new modal(data)
    try {
        const modal = await db.save()
        return handleResultSuccessNoPage(createMessage.createSuccess(name), {
            ...modal._doc,
        })
    } catch (error) {
        return handleResultError(createMessage.createFail(name))
    }
}
export async function _Finds(
    modal: any,
    query: any,
    paging: { limit: number; page: number },
    name: string = 'đối tượng'
) {
    paging = {
        page: Number(paging.page) || DEFAULT_PAGE.page,
        limit: Number(paging.limit) || DEFAULT_PAGE.limit,
    }
    const skip = (paging.page - 1) * paging.limit
    try {
        const modals = await modal.find(query).skip(skip).limit(paging.limit)
        console.log(modals)
        if (modals) {
            const total = await modal.countDocuments()
            return handleResultSuccess(
                createMessage.findSuccess(name),
                modals,
                { ...paging, total: total }
            )
        }
    } catch (error) {
        return handleResultError(createMessage.findFail(name) + ':' + error)
    }
}

export async function _Find(modal: any, query: any, name: string) {
    try {
        const modals = await modal.findOne(query)
        if (modals) {
            return handleResultSuccessNoPage(
                createMessage.findSuccess('name'),
                modals
            )
        }
    } catch (error) {
        return handleResultError(createMessage.findFail(name))
    }
}

export async function _FindByIdAndDelete(
    modal: any,
    query: object,
    name: string
) {
    return modal
        .findByIdAndDelete(query)
        .then((result: any) => {
            if (result) {
                return handleResultSuccessNoPage(
                    createMessage.deleteSuccess(name),
                    result
                )
            } else {
                return handleResultError(createMessage.findFail('id ' + name))
            }
        })
        .catch((error: any) => {
            return handleResultError(error)
        })
}

export async function _FindByIdAndUpdate(
    modal: any,
    query: {
        _id: string
    },
    name: string
) {
    return modal
        .findOneAndUpdate(query._id, query)
        .then((result: any) => {
            if (result) {
                return handleResultSuccessNoPage(
                    createMessage.updateSuccess(name),
                    result
                )
            } else {
                return handleResultError(createMessage.updateFail('id ' + name))
            }
        })
        .catch((error: any) => {
            return handleResultError(error)
        })
}
