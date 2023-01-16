var mongoose = require('mongoose')
var Schema = mongoose.Schema

const TypeCard = new Schema(
    {
        name: { type: String, required: true },
        desc: { type: String, required: false },
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('typeCard', TypeCard)
