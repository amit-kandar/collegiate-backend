const db = require('../../config/database')
const Post = db.post

const Deletepost = async(req, res) => {
    let success = false

    const post = await Post.findOne({where: {id: req.params.id}})
    console.log(post);
    if(!post) return res.status(400).json({success: success, Message: "There is no post to delete!"})

    try {
        await Post.destroy({where: {id: req.params.id}})
        success = true
        res.status(200).json({success: success, Message: "Successfully Deleted!"})
    } catch (error) {
        res.status(400).json({ success: success, Error: error})
    }
}

module.exports = Deletepost