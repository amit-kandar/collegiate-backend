const db = require('../../config/database')
const Admin = db.admin

const fetchAdmin =async (req, res)=> {
    let success = false;
    try {

        //Id is get from middleware 
        const admin = await Admin.findAll({where: {id: data.id}, attributes: ['firstname', 'lastname', 'email', 'phone'] })
        success = true
        res.status(200).json({ success: success, Admin: admin })
        return
    } catch (error) {
        res.status(500).json({ success: success, message: error.message })
        return
    }
}

module.exports = fetchAdmin