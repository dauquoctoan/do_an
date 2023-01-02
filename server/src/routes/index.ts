import express from 'express'
import adminRouter from './admin'
import siteRouter from './site'
import authGoogle from './auth'
import error from './error'

function router(app: express.Application) {
    app.use('/', siteRouter)
    app.use('/admin', adminRouter)
    app.use('/auth', authGoogle)
    app.use('/error', error)
}

export default router
