import { string } from 'joi'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

const AdminUser = new Schema(
    {
        name: { type: String, required: true },
        age: { type: Number, required: true },
        email: { type: String, required: false },
        picture: { type: String, required: false },
        password: { type: String, required: true },
        status: { type: String, required: false, default: '1' },
        role: {
            type: String,
            enum: ['0', '1'],
            default: '1',
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

/* 
status: 1 staff
status: 0 admin
*/
export default mongoose.model('AdminUser', AdminUser)
