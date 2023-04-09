const db = require('../../config/database')

const User = db.user

const EditProfileImage = async(req, res) => {
    let success = false
    
    try {
        await User.update({ profileimage: req.file.path }, {where: {id: data.id}});
        success = true
        res.status(200).json({success: success, Message: "Updated Successfully!"})
    } catch (error) {
        res.status(400).json({Error: error})
    }
}

module.exports = EditProfileImage