var mongoose = require('mongoose')
var Schema = mongoose.Schema

export interface IUser {
    name: String
    email: String
    picture?: String
    givenName?: String
    typeAccount: Number
    iat?: String
    exp?: Number
    email_verified?: Number
    passWord?: String
    age?: String
}

const User: IUser = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        picture: { type: String, required: false },
        givenName: { type: String, required: false },
        typeAccount: { type: Number, enum: [0, 1, 2], required: true },
        iat: { type: Number, required: false },
        exp: { type: Number, required: false },
        email_verified: { type: Boolean, required: false },
        passWord: { type: String, required: false },
        age: { type: Number, required: false },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('User', User)
