var mongoose = require('mongoose')
var Schema = mongoose.Schema

const Part = new Schema(
    {
        title: { type: String, required: true },
        desc: { type: String, required: false },
        picture: { type: String, required: true },
        link: { type: String, required: false },
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('Part', Part)
