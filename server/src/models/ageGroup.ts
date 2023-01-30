import { string } from 'joi'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

const AgeGroup = new Schema(
    {
        title: { type: String, required: true },
        desc: { type: String, required: true },
        age: { type: Number, required: false },
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('ageGroup', AgeGroup)
