const db = require('../../config/database')
const { signupSchema } = require('../../validator/adminvalidator')
const bcrypt = require('bcrypt')
const Admin = db.admin
const axios = require('axios');

const signUp = async (req, res) => {

    let success = false;
    // Checking Validation
    const { error } = signupSchema.validate(req.body)
    if (error) {
        return res.status(422).json({ success: success, error: error.message })
    }

    let info = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        adminid: '',
        password: req.body.password,
        adminimage: req.file.path,
        createdAt: Date.now(),
        expiresAt: Date.now() + 31536000000
    }

    // Check email already exits or not
    const emailid = await Admin.findOne({ where: { email: info.email } })
    if (emailid) {
        return res.status(409).json({ success: success, message: "Email already exist", })
    }

    // Phone Number Validation
    const response = await axios.get(`https://phonevalidation.abstractapi.com/v1/?api_key=a57a7fd14f294b7ea5d0329727c35260&phone=${info.phone}`)

    if (!response.data.valid) {
        return res.status(422).json({ success: success, error: "Invalid Phone Number" })
    }

    try {

        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(info.password, salt)

        // Generate Admin ID
        const adminid = info.firstname.toString().toUpperCase() + Math.random().toString(16).toUpperCase().slice(2, 15);
        const secAdminId = await bcrypt.hash(adminid, salt)
        info.password = secPass
        info.adminid = secAdminId
        
        await Admin.create(info)

        // Sending response
        success = true
        res.status(201).json({ success: success, AdminId: adminid })
    } catch (error) {
        res.status(500).json({ success: success, message: error.message })
    }

}

module.exports = signUp
