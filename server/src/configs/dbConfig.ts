import { Sequelize } from 'sequelize'
import DB_CONFIG from './index'

const sequelize: any = new Sequelize(DB_CONFIG.db_name, 'root', '123456@Aa', {
    host: DB_CONFIG.db_host,
    port: DB_CONFIG.db_port,
    dialect: 'mysql',
})

function connectDB() {
    sequelize
        .authenticate()
        .then(() => {
            console.log(
                '====Connection has been established successfully=====.'
            )
            // sequelize
            //     .sync({ force: false, alter: true, logging: console.log }) // thêm mới mà k xóa
            //     // xóa hết rồi thêm lại
            //     // .sync({ force: true })
            //     .then((res: any) => {
            //         console.log(res)
            //     })
            //     .catch((err: Error) => {
            //         console.error(err)
            //     })
        })
        .catch((error: Error) => {
            console.error('Unable to connect to the database: ', error)
        })
    // sequelize
    //     // .sync({ force: false, alter: true, logging: console.log }) // thêm mới mà k xóa
    //     // xóa hết rồi thêm lại
    //     .sync({ force: true })
    //     .then((res: any) => {
    //         console.log(res)
    //     })
    //     .catch((err: Error) => {
    //         console.error(err)
    //     })
}

export { connectDB, sequelize }
