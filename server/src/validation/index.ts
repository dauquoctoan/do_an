const Joi = require('joi')

export const Card = Joi.object().keys({
    type: Joi.string().required(),
    question: Joi.string().min(3).max(40).required(),
    age: Joi.number().integer().min(16),
})
