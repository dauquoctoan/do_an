var mongoose = require('mongoose')
var Schema = mongoose.Schema

const Lesson = new Schema(
    {
        title: { type: String, required: true },
        type: { type: String, required: true },
        options: { type: Array, required: true },
        answer: { type: Number, required: false },
        answers: { type: Array, required: false },
        status: { type: Object, required: false },
        level: { type: Number, required: true },
        part: {
            type: Schema.Types.ObjectId,
            ref: 'Part',
        },
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('Lesson', Lesson)
