import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from './src/configs/dbConfig'
import User from './src/models/user'
import router from './src/routes'

dotenv.config()
const port = process.env.SERVER_PORT

const app = express()
app.use(cors())

connectDB()
router(app)

app.get('/', async (req, res) => {
    const data = await User.findAll()
    res.send(data)
})

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})
