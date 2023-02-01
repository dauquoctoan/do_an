var mongoose = require('mongoose')
var Schema = mongoose.Schema

/* Creating a new schema for the Topic model. */
const Topic = new Schema(
    {
        point: { type: String, required: true },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'users',
        },
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('Topic', Topic)
