const mongoose = require('mongoose')

const Schema = mongoose.Schema

const User = new Schema(
    {
        googleId: { type: String, required: false },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('User', User)
