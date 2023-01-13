var mongoose = require('mongoose')
var Schema = mongoose.Schema

export interface ISort {
    name: String
    email: String
    picture?: String
    givenName?: String
    typeAccount: Number
    iat?: String
    exp?: Number
    email_verified?: Number
    passWord?: String
}

const Sort: ISort = new Schema(
    {
        title: { type: String, required: true },
        data: { type: Array, required: true },
        picture: { type: String, required: false },
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('sorts', Sort)
