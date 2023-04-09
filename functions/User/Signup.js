const { signupSchema } = require('../../validator/uservalidator')
const db = require('../../config/database');
const { user } = require('../../config/database');
const bcrypt = require('bcrypt')
const axios = require('axios')
const User = db.user

const SignUp = async(req, res)=>{
    let success = false;

    let { error } = signupSchema.validate(req.body)
    if(error) return res.status(201).json({success: success, Error: error})

    let info = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        profileimage: req.file.path,
        password: req.body.password
    }

    // Checking Email
    const emailid = await user.findOne({where: {email: info.email}})
    if(emailid) return res.status(409).json({success: success, Error: "Email already exits"})

    // Phone Number Validation
    const response = await axios.get(`https://phonevalidation.abstractapi.com/v1/?api_key=a57a7fd14f294b7ea5d0329727c35260&phone=${info.phone}`)
    if(!response.data.valid) return res.status(422).json({success: success, Error: "Invalid phone number"})

    try {
        const salt = await bcrypt.genSalt(10)
        const securepassword = await bcrypt.hash(info.password, salt)
        info.password = securepassword

        await User.create(info)
        success = true
        res.status(201).json({success: success, Message: "Account created successfully!"})
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = SignUp