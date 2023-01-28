import {
    _Creates,
    _Find,
    _FindByIdAndDelete,
    _FindByIdAndUpdate,
    _Finds,
} from '../service'
import argon2 from 'argon2'
import AdminUser from '../models/AdminUser'
import { handleSearchMongoose } from '../utils'

class adminController {
    async getAUsers(req: any, res: any) {
        const result = await _Finds(
            AdminUser,
            {
                ...handleSearchMongoose('name', req.query.search || ''),
                ...req.query,
            },
            'quản trị'
        )
        res.json(result)
    }

    async createAUser(req: any, res: any) {
        const hashPw = await argon2.hash(req?.body?.password || '')
        const result = await _Creates(
            AdminUser,
            { ...req?.body, password: hashPw },
            'quản trị'
        )
        res.json(result)
    }

    async updateAUser(req: any, res: any) {
        const result = await _FindByIdAndUpdate(
            AdminUser,
            req?.body,
            'quản trị'
        )
        res.json(result)
    }

    async deleteAUser(req: any, res: any) {
        const result = await _FindByIdAndDelete(
            AdminUser,
            req?.body,
            'quản trị'
        )
        res.json(result)
    }
}

export default new adminController()
