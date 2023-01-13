var mongoose = require('mongoose')
var Schema = mongoose.Schema

const Card = new Schema(
    {
        type: { type: String, required: true },
        question: { type: Array, required: true },
        answer: { type: Number, required: true },
        status: { type: Object, required: false },
        level: { type: Number, required: true },
        topic: { type: String, required: true },
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('cards', Card)
