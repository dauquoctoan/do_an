import express from 'express'
import adminRouter from './admin'
import siteRouter from './site'
import appRouter from './app'

function router(app: express.Application) {
    app.use('/', siteRouter)
    app.use('/admin', adminRouter)
    app.use('/app', appRouter)
}

export default router
