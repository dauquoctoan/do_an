var mongoose = require('mongoose')
var Schema = mongoose.Schema

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

export default mongoose.model('topics', Topic)
