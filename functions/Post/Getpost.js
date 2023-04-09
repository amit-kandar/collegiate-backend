const db = require("../../config/database");
const User = db.user;
const Post = db.post

const getpost = async (req, res) => {
  let success = false;

  try {
    const post = await Post.findAll({
      where: { userId: data.id },
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

    res.status(200).json({ success: success, posts: post });
  } catch (error) {
    res.status(500).json({ Error: error });
  }
};

module.exports = getpost
