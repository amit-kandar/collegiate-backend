const db = require('../../config/database')
const { profileeditschema } = require("../../validator/uservalidator")

const User = db.user

const EditProfile = async(req, res) => {
    let success = false

    const { error } = profileeditschema.validate(req.body)
    if(error)
        res.status(422).json({success: success, Error: error})

    let info = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        profileimage: req.file.path
    }
    
    try {
        await User.update({ firstname: info.firstname, lastname: info.lastname, email: info.email, phone: info.phone, profileimage: info.profileimage }, {where: {id: data.id}});
        success = true
        res.status(200).json({success: success, Message: "Updated Successfully!"})
    } catch (error) {
        res.status(400).json({Error: error})
    }
}

module.exports = EditProfile