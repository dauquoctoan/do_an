var mongoose = require('mongoose')
var Schema = mongoose.Schema

const Course = new Schema(
    {
        title: { type: String, required: true },
        desc: { type: String, required: true },
        picture: { type: String, required: false },
        price: { type: String, required: false },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'AdminUser',
        },
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('course', Course)
