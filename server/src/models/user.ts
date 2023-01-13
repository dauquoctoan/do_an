var mongoose = require('mongoose')
var Schema = mongoose.Schema

const User = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        picture: { type: String, required: false },
        givenName: { type: String, required: false },
        typeAccount: { type: Number, enum: [0, 1, 2], required: true },
        iat: { type: Number, required: false },
        exp: { type: Number, required: false },
        email_verified: { type: Boolean, required: false },
        password: { type: String, required: false },
        age: { type: Number, required: false },
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('users', User)
