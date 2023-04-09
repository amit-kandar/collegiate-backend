const db = require('../../config/database')
const User = db.user

const Deleteprofile = async(req, res) => {
    let success = false

    try {
        await User.destroy({where: {id: data.id}})
        success = true
        res.status(200).json({success: success, Message: "Successfully Deleted!"})
    } catch (error) {
        res.status(400).json({ success: success, Error: error})
    }
}

module.exports = Deleteprofile