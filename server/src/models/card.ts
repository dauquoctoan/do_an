import { Icard } from './interface'

var mongoose = require('mongoose')
var Joi = require('Joi')
var Schema = mongoose.Schema

const LCard: Icard = new Schema(
    {
        type: { type: String, required: true },
        question: { type: Array, required: true },
        answer: { type: Number, required: true },
        status: { type: Object, required: false },
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('Sort', LCard)
