import express from 'express'
import adminRouter from './admin'
import siteRouter from './site'
import authRouter from './auth'
import { middleAuthenTication } from '../middleware'

function router(app: express.Application) {
    app.use('/', siteRouter)
    app.use('/auth', authRouter)
    app.use('/admin', adminRouter)
}

export default router
