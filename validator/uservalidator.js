const Joi = require('joi')

const signupSchema = Joi.object({
    firstname: Joi.string().min(3).message('First name must be atleast 3 letters').required(),
    lastname: Joi.string().min(3).message('Last name must be atleast 3 letters').required(),
    email: Joi.string().email().message('Invalid email').required(),
    phone: Joi.string().required(),
    password: Joi.string().uppercase().lowercase().alphanum().required().exist()
})

const signinschema = Joi.object({
    email: Joi.string().email().message('Invalid email').required(),
    password: Joi.string().uppercase().lowercase().alphanum().required().exist()
})

const profileeditschema = Joi.object({
    firstname: Joi.string().min(3).message('First name must be atleast 3 letters').required(),
    lastname: Joi.string().min(3).message('Last name must be atleast 3 letters').required(),
    email: Joi.string().email().message('Invalid email').required(),
    phone: Joi.string().required()
})

module.exports = { signupSchema, signinschema, profileeditschema }