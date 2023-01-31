import express from 'express'
import adminRouter from './admin/index'
import siteRouter from './site/index'
import authRouter from './auth'
import uploadRouter from './upload'
import { middleAuthenTication } from '../middleware'

function router(app: express.Application) {
    app.use('/upload', uploadRouter)
    app.use('/site', siteRouter)
    app.use('/', authRouter)
    app.use('/admin', adminRouter)
}

export default router
