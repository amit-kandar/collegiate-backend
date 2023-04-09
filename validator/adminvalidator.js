const Joi = require('joi')

const signupSchema = Joi.object({
    firstname: Joi.string().min(3).message('First name must be atleast 3 letters').required(),
    lastname: Joi.string().min(3).message('Last name must be atleast 3 letters').required(),
    email: Joi.string().email().message('Invalid email').required(),
    phone: Joi.string().required(),
    password: Joi.string().uppercase().lowercase().alphanum().required().exist()
})

const signinSchema = Joi.object({
    email: Joi.string().email().message('Invalid email').required(),
    password: Joi.string().uppercase().lowercase().alphanum().required().exist(),
    adminid: Joi.string().required().exist()
})

const forgetPassSchema = Joi.object({
    emailId: Joi.string().email().message("Invalid Email").required(),
    adminId : Joi.string().required()
})

const createNewPassSchema = Joi.object({
    password: Joi.string().uppercase().lowercase().alphanum().required().exist(),
    confirmPassword: Joi.string().uppercase().lowercase().alphanum().required().exist()
})

module.exports = { signupSchema, signinSchema, forgetPassSchema, createNewPassSchema}