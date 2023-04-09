const db = require("../../config/database");
const User = db.user;
const Post = db.post

const getprofile = async (req, res) => {
  let success = false;

  try {
    const user = await User.findAll({
      where: { id: data.id },
      attributes: [
        "firstname",
        "lastname",
        "email",
        "phone",
        "profileimage",
        "createdAt",
      ],
      include: [{
        model: Post,
        attributes: {
          exclude: ['id', 'updatedAt', 'userId']
        }
      }]
    });

    success = true;

    res.status(200).json({ success: success, user: user });
  } catch (error) {
    res.status(500).json({ Error: error });
  }
};

module.exports = getprofile
