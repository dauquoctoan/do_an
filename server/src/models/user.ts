const mongoose = require('mongoose')

const Schema = mongoose.Schema

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
}

const User: IUser = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        picture: { type: String, required: true },
        givenName: { type: String, required: false },
        typeAccount: { type: Number, enum: [0, 1], required: true },
        iat: { type: Number, required: true },
        exp: { type: Number, required: true },
        email_verified: { type: Boolean, required: false },
        password: { type: String, required: false },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('User', User)
