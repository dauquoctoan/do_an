const Joi = require('joi')

const _userName = Joi.string().alphanum().min(3).max(30)
const _email = Joi.string().email()
const _password = Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
const _token = Joi.string().token()
const _birth_year = Joi.number().integer().min(1900).max(2013)

export const JCreateUser = Joi.object({
    name: _userName.required(),
    email: _email.required(),
    picture: Joi.string(),
    givenName: _userName,
    typeAccount: Joi.number().required(),
    iat: Joi.string(),
    exp: Joi.string(),
    email_verified: Joi.string(),
    password: _password.required(),
    age: _birth_year,
})

export const JCreateCard = Joi.object({
    type: Joi.string().required(),
    question: Joi.string().required(),
    answer: Joi.number().required(),
    status: Joi.number(),
    level: Joi.number().required(),
    topic: Joi.string().required(),
})
