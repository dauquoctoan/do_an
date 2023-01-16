var mongoose = require('mongoose')
var Schema = mongoose.Schema

const Lesson = new Schema(
    {
        title: { type: String, required: true },
        type: { type: Number, required: true },
        options: { type: Array, required: true },
        answer: { type: String, required: false },
        answers: { type: Array, required: false },
        status: { type: Object, required: false },
        level: { type: Number, required: true },
        topic: { type: Schema.Types.ObjectId, ref: 'topics' },
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('lessons', Lesson)
