import { Router } from 'express'
import { valid } from 'joi'
import { middleUpload, validate } from '../middleware'
import { createMessage, handleResultSuccessNoPage } from '../utils'
import { JUpload } from '../validation'
const router = Router()

router.post(
    '/image',
    validate(JUpload),
    middleUpload.single('image'),
    (req: any, res: any) => {
        const proxyHost = req.headers['x-forwarded-host']
        const host = proxyHost ? proxyHost : req.headers.host
        const file_path = `http://${host + '/' + req.file.path}`
        res.json(
            handleResultSuccessNoPage('Upload thành công', [
                file_path.replace(/\\/g, '/'),
            ])
        )
    }
)

router.post('/images', (req, res) => {})

export default router
