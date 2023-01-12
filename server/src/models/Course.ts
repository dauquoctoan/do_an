import { Icard } from './interface'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

const Sort: Icard = new Schema(
    {
        title: { type: String, required: true },
        data: { type: Array, required: true },
        picture: { type: String, required: false },
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('Sort', Sort)
