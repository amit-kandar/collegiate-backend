const Joi = require('joi')

const addpostschema = Joi.object({
    about: Joi.string().min(3).message('About must be atleast 3 letters').required()
})
const editpostschema = Joi.object({
    about: Joi.string().min(3).message('About must be atleast 3 letters').required()
})
module.exports = { addpostschema, editpostschema }