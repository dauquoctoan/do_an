import { DataTypes } from 'sequelize'
import { sequelize } from '../configs/dbConfig'
const User = sequelize.define('users', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})

export default User
