var mongoose = require('mongoose')
var Schema = mongoose.Schema

const EventNews = new Schema(
    {
        title: { type: String, required: true },
        desc: { type: String, required: true },
        picture: { type: String, required: true },
        link: { type: String, required: true },
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('EventNews', EventNews)
