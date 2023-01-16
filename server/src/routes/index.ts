import express from 'express'
import adminRouter from './admin/index'
import comMRouter from './community/index'
import authRouter from './auth'
import uploadRouter from './upload'

function router(app: express.Application) {
    app.use('/', comMRouter)
    app.use('/admin', adminRouter)
    app.use('/auth', authRouter)
    app.use('/upload', uploadRouter)
}

export default router
