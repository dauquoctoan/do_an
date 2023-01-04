export function handleResult(
    message: string,
    data: any = [],
    code: number = 1,
    page: any = {
        limit: 24,
        index: 1,
        total: 1,
    }
) {
    return {
        code: code,
        data: data,
        message: message,
        page: page,
    }
}

export async function MCreate(modal: any, query: any, name: String, data: any) {
    const oldModal = await modal.find(query)
    if (oldModal?.length > 0) {
        return {
            message: name + ' đã tồn tại',
            data: [],
            code: 0,
        }
    }
    const db = new modal(data)
    try {
        const modal = await db.save()
        return {
            message: 'Tạo thành công ' + name,
            data: {
                ...modal,
            },
            code: 1,
        }
    } catch (error) {
        return {
            message: 'Tạo không thành công ' + name,
            data: [],
            code: 0,
        }
    }
}
