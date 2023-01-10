var mongoose = require('mongoose')
var Schema = mongoose.Schema

export interface ICourse {
    name: String
    price: Number
    typeCourse: Number
    expirationDate: String
    buyDate: String
}

const Course: ICourse = new Schema(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        typeCourse: { type: Number, enum: [0, 1], required: true },
        expirationDate: { type: Date, required: true },
        buyDate: { type: Date, required: true },
    },
    {
        created_at: { type: Date },
        updated_at: { type: Date },
    }
)

module.exports = mongoose.model('Course', Course)
