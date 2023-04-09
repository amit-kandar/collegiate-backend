const db = require("../../config/database");
const User = db.user;
const Post = db.post

const getallpost = async (req, res) => {
  let success = false;

  try {
    const posts = await Post.findAll({
      attributes: [
        'about',
        'postimage',
        'createdAt'
      ],
      include: [{
        model: User,
        attributes: ['firstname', 'lastname', 'profileimage']
      }]
    });

    success = true;

    res.status(200).json({ success: success, posts: posts });
  } catch (error) {
    res.status(400).json({ Error: error });
  }
};

module.exports = getallpost