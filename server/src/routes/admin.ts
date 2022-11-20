import { Router } from 'express'
const router = Router()

router.use((req, res, next) => {
    //midle ware
    next()
})

router.get('/test', (req, res, next) => {
    // ..
    res.send('admin')
})

export default router
