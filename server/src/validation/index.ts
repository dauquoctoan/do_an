const Joi = require('joi')

const _userName = Joi.string().alphanum().min(3).max(30)
const _email = Joi.string().email()
const _password = Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
const _token = Joi.string().token()
const _birth_year = Joi.number().integer().min(1900).max(2013)

export const createUser = Joi.object({
    name: _userName.required(),
    password: _password,
    access_token: _token,
    birth_year: _birth_year,
    email: _email,
})
