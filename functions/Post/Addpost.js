const { addpostschema } = require('../../validator/postvalidator')
const db = require('../../config/database')
const Post = db.post
const User = db.user

const Addpost = async(req, res) => {
    let success = false

    const { error } = addpostschema.validate(req.body)
    if(error) return res.status(422).json({success: success, Error: error})

    const info = {
        about: req.body.about,
        postimage: req.file.path,
        userId: data.id
    }

    try {
        const response = await Post.create(info)
        success = true
        res.status(201).json({success: success, Post: response})
    } catch (error) {
        res.status(400).json({success: success, Error: error})
    }
}

module.exports = Addpost