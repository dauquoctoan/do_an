var mongoose = require('mongoose')
var Schema = mongoose.Schema

/* Creating a new schema for the Topic model. */
const Topic = new Schema(
    {
        name: { type: String, required: true },
        desc: { type: String, required: false },
        picture: { type: String, required: false },
        ageGroup: { type: String, enum: ['1', '2', '3', '4'], required: true },
        isLock: { type: Boolean, default: true, required: true },
        course: {
            type: Schema.Types.ObjectId,
            ref: 'course',
            required: false,
        },
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('Topic', Topic)
