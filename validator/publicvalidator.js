const Joi = require('joi')

const feedback = Joi.object({
    name: Joi.string().min(3).message('Name must be atleast 3 letters').required(),
    email: Joi.string().email().message('Invalid email').required(),
    phone: Joi.string().required(),
    message: Joi.string().min(5).message('Message must be atleast 5 letters').required()
})

module.exports = feedback