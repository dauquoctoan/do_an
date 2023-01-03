const mongoose = require('mongoose')

const Schema = mongoose.Schema

const User: {
    googleId: String
    name: String
    given_name: String
    photos: String
    email: String
    picture: String
    givenName: String
    typeAccount: Number
    iat: Number
    exp: Number
    email_verified: Boolean
} = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        picture: { type: String, required: true },
        givenName: { type: String, required: false },
        typeAccount: { type: Number, enum: [0, 1], required: true },
        iat: { type: Number, required: true },
        exp: { type: Number, required: true },
        email_verified: { type: Boolean, required: false },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('User', User)
