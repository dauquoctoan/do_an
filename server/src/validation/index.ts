const Joi = require('joi')
const _userName = Joi.string().alphanum().min(3).max(30)
const _email = Joi.string().email()
const _password = Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
const _token = Joi.string().token()
const _birth_year = Joi.string()

export const JCreateUser = Joi.object({
    name: _userName.required(),
    age: Joi.string().required(),
    email: _email.required(),
    picture: Joi.string(),
    givenName: _userName,
    typeAccount: Joi.number(),
    iat: Joi.string(),
    exp: Joi.string(),
    email_verified: Joi.string(),
    password: _password.required(),
})

export const JCreateUserWithToken = Joi.object({
    token: Joi.string().required(),
})

export const JUpdateUser = Joi.object({
    _id: Joi.string().required(),
    name: _userName.required(),
    email: _email.required(),
    picture: Joi.string(),
    givenName: _userName,
    typeAccount: Joi.number().required(),
    iat: Joi.string(),
    exp: Joi.string(),
    email_verified: Joi.string(),
    password: _password.required(),
    age: Joi.string().required(),
})

export const JCreateLesson = Joi.object({
    title: Joi.string().required(),
    type: Joi.string().required(),
    options: Joi.array().required(),
    answer: Joi.number(),
    answers: Joi.array(),
    status: Joi.string(),
    level: Joi.number().required(),
    // topic: Joi.string().required(),
    part: Joi.string().required(),
    _id: Joi.string(),
})

export const JUpdateLesson = Joi.object({
    title: Joi.string().required(),
    type: Joi.string().required(),
    options: Joi.array().required(),
    answer: Joi.number(),
    answers: Joi.array(),
    status: Joi.string(),
    level: Joi.number().required(),
    part: Joi.string().required(),
    _id: Joi.string().required(),
})

export const JCreateTopic = Joi.object({
    _id: Joi.string(),
    name: Joi.string().required(),
    desc: Joi.string(),
    picture: Joi.string(),
})

export const JUpdateTopic = Joi.object({
    _id: Joi.string().required(),
    name: Joi.string().required(),
    desc: Joi.string(),
    picture: Joi.string().required(),
})

export const JDelete = Joi.object({
    _id: Joi.string().required(),
})

export const JUpload = Joi.object({
    'Form Data': Joi.object({
        image: Joi.binary().required(),
    }),
})

export const JUploads = Joi.object({
    'Form Data': Joi.object({
        images: Joi.binary().required(),
    }).required(),
})

export const JCreatePart = Joi.object({
    title: Joi.string().required(),
    desc: Joi.string(),
    picture: Joi.string().required(),
    topic: Joi.string().required(),
})

export const JUpdatePart = Joi.object({
    _id: Joi.string().required(),
    title: Joi.string().required(),
    desc: Joi.string(),
    picture: Joi.string().required(),
    topic: Joi.string().required(),
})

export const JCreateAUser = Joi.object({
    name: Joi.string().required(),
    email: _email,
    age: Joi.number(),
    picture: Joi.string(),
    password: Joi.string().required(),
    status: Joi.string(),
    role: Joi.string().required(),
})

export const JUpdateAUser = Joi.object({
    _id: Joi.string().required(),
    name: _userName.required(),
    email: _email,
    age: Joi.number(),
    picture: Joi.string(),
    password: Joi.string(),
    status: Joi.string(),
    role: Joi.string().required(),
})

export const JChangeStatusAUser = Joi.object({
    _id: Joi.string().required(),
    status: Joi.string().required(),
})

export const JLoginAdmin = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
})
