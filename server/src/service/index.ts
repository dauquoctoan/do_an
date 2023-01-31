import { limits } from 'argon2'
import { CODE, DEFAULT_PAGE, STRINGS } from '../configs/constants'

import {
    createMessage,
    handleResultError,
    handleResultSuccessNoPage,
    handleResultSuccess,
    handleRemoveKeysNull,
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
    data: any,
    name: string = 'đối tượng'
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
    name: string = 'đối tượng',
    populate: string | object | null = null
) {
    console.log('ageGroup', query.ageGroup)
    query = handleRemoveKeysNull(query)
    const paging = {
        page: Number(query.page) || DEFAULT_PAGE.page,
        limit: Number(query.limit) || DEFAULT_PAGE.limit,
    }
    delete query['page']
    delete query['limit']
    delete query['search']
    const skip = (paging.page - 1) * paging.limit
    try {
        const modals = await modal
            .find(query)
            .skip(skip)
            .limit(paging.limit)
            .populate(populate)
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
                modals?._doc
            )
        }
    } catch (error) {
        return handleResultError(createMessage.findFail(name))
    }
}

export async function _FindByIdAndDelete(
    modal: any,
    query: { _id: string },
    name: string
) {
    return modal
        .findByIdAndDelete({ _id: query._id })
        .then((result: any) => {
            if (result) {
                return handleResultSuccessNoPage(
                    createMessage.deleteSuccess(name),
                    result
                )
            } else {
                return handleResultError(createMessage.findFail(name))
            }
        })
        .catch((error: any) => {
            console.log(error)
            return handleResultError(createMessage.deleteFail(name))
        })
}

export async function _FindByIdAndUpdate(
    modal: any,
    query: {
        _id?: string
    },
    name: string
) {
    const _id = query._id
    delete query['_id']
    return modal
        .findByIdAndUpdate(_id, query)
        .then((result: any) => {
            if (result) {
                return handleResultSuccessNoPage(
                    createMessage.updateSuccess(name),
                    result
                )
            } else {
                return handleResultError(createMessage.updateFail(name))
            }
        })
        .catch((error: any) => {
            return handleResultError(createMessage.updateFail(error))
        })
}

export async function _FindsRandom(
    modal: any,
    query: any,
    name: string = 'đối tượng',
    populate: string | object | null = null
) {
    query = handleRemoveKeysNull(query)
    const paging = {
        page: Number(query.page) || DEFAULT_PAGE.page,
        limit: Number(query.limit) || 10,
    }
    delete query['page']
    delete query['limit']
    delete query['search']
    try {
        const total = await modal.count()
        var random = Math.floor(Math.random() * (total - paging.limit))
        random = random < 0 ? 0 : random
        const result = await modal.find(query).skip(random).populate(populate)
        return handleResultSuccess(createMessage.findSuccess(name), result, {
            ...paging,
            total: total,
        })
    } catch (error) {
        return handleResultError(createMessage.findFail(name) + ':' + error)
    }
}
