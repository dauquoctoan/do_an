var mongoose = require('mongoose')
var Schema = mongoose.Schema

const Lesson = new Schema(
    {
        title: { type: String, required: true },
        type: { type: Number, required: true },
        options: { type: Array, required: true },
        answer: { type: Number, required: false },
        answers: { type: Array, required: false },
        status: { type: Object, required: false },
        level: { type: Number, required: true },
        topic: {
            type: Schema.Types.ObjectId,
            ref: 'Topic',
        },
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('Lesson', Lesson)
