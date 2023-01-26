var mongoose = require('mongoose')
var Schema = mongoose.Schema

/* Creating a new schema for the Topic model. */
const Topic = new Schema(
    {
        name: { type: String, required: true },
        desc: { type: String, required: false },
        picture: { type: String, required: false },
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('Topic', Topic)
