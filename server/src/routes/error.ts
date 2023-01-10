import { Router } from 'express'
const router = Router()

router.post('/', (req, res, next) => {
    res.send('error')
})

export default router
