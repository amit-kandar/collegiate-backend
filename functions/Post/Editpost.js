const { editpostschema } = require('../../validator/postvalidator')
const db = require('../../config/database')
const Post = db.post

const Editpost = async(req, res) => {
    let success = false

    const { error } = editpostschema.validate(req.body)
    if(error) return res.status(422).json({success: success, Error: error})

    const info = {
        about: req.body.about,
        postimage: req.file.path,
        id: req.params.id
    }
    
    try {
        await Post.update({about: info.about, postimage: info.postimage}, {where: {id: info.id}})
        success = true
        res.status(201).json({success: success, Message: "Successfully Updated!"})
    } catch (error) {
        res.status(400).json({Error: error})
    }
}

module.exports = Editpost