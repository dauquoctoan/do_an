const mongoose = require('mongoose')

const Schema = mongoose.Schema

const User: {
    googleId: String
    name: String
    given_name: String
    photos: String
} = new Schema(
    {
        googleId: { type: String, required: true },
        name: { type: String, required: true },
        photos: { type: String, required: true },
        familyName: { type: String, required: true },
        givenName: { type: String, required: true },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('User', User)
