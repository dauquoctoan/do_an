const DB_CONFIG: IDbConfig = {
    db_host: process.env.DB_HOST || 'localhost',
    db_port: Number(process.env.DB_PORT) || 3306,
    db_name: process.env.DB_NAME || 'my_db',
    db_password: process.env.DB_PASSWORD || '123456@Aa',
    db_username: process.env.DB_USERNAME || 'root',
    db_dialect: 'mysql',
}

interface IDbConfig {
    db_host: string
    db_port: number
    db_name: string
    db_password: string
    db_username: string
    db_dialect: string
}

export default DB_CONFIG
