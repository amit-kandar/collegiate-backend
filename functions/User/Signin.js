const { signinschema } = require("../../validator/uservalidator");
const db = require("../../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = db.user;
const JWT_Sec = process.env.JWT_Sec;

const Signin = async (req, res) => {
  let success = false;

  let { error } = signinschema.validate(req.body);
  if (error) return res.status(200).json({ success: success, Error: error });

  let info = {
    email: req.body.email,
    password: req.body.password,
  };

  try {
    let user = await User.findAll({ where: { email: info.email } });
    user = user[0].dataValues;
    const emailid = user.email;
    if (!emailid)
      return res.status(401).json({ success: success, Error: "Invalid Email" });

    let password = user.password;
    password = await bcrypt.compare(info.password, password);
    if (!password)
      return res
        .status(401)
        .json({ success: success, message: "Invalid password" });

    const payload = {
      id: user.id,
      name: user.firstname + "_" + user.lastname,
      email: user.email,
    };

    const authtoken = jwt.sign(payload, JWT_Sec);
    success = true;
    res.status(200).json({ success: success, authtoken: authtoken });
  } catch (error) {
    res.status(400).json({ Error: error });
  }
};

module.exports = Signin;
