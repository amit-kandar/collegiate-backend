// Validation Schema
const { signinSchema } = require("../../validator/adminvalidator");

// JWT
const jwt = require("jsonwebtoken");

// Password Handler
const bcrypt = require("bcrypt");

//Session Handler
const session = require("express-session");

// JWT Secret
const JWT_Sec = process.env.JWT_Sec;

// Databse stuff
const db = require("../../config/database");

const Admin = db.admin;

const signin = async (req, res) => {
  let success = false;

  // Cheaking Validation
  const { error } = signinSchema.validate(req.body);
  if (error) {
    return res.status(422).json({ success: success, message: error.message });
  }

  // Getting data
  let info = {
    email: req.body.email,
    adminid: req.body.adminid,
    password: req.body.password,
  };

  try {
    const admin = await Admin.findAll({ where: { email: info.email } });

    // Checking email
    const emailid = admin[0].dataValues.email;
    if (!emailid)
      return res
        .status(401)
        .json({ success: success, message: "Invalid Email" });

    // Checking Password
    let password = admin[0].dataValues.password;
    password = await bcrypt.compare(info.password, password);
    if (!password) {
      return res
        .status(401)
        .json({ success: success, message: "Invalid password" });
    }

    // Checking Admin Id
    let adminid = admin[0].dataValues.adminid;
    adminid = await bcrypt.compare(info.adminid, adminid);
    if (!adminid) {
      return res
        .status(401)
        .json({ success: success, message: "Invalid AdminId" });
    }

    const expiresAt = await Admin.findOne({
      where: { email: info.email },
      attributes: ["expiresAt"],
    });

    // Is Expired
    if (expiresAt.dataValues.expiresAt < Date.now()) {
      return res
        .status(401)
        .json({
          success: success,
          message: "Your 1 year contract is expired!",
        });
    }

    // Payload
    const payload = {
      id: admin[0].dataValues.id,
      Issuer:
        admin[0].dataValues.firstname + "_" + admin[0].dataValues.lastname,
      Role: "Admin",
      Adminid: info.adminid,
      Expiration: admin[0].dataValues.expiresAt,
    };
    const authtoken = jwt.sign(payload, JWT_Sec);

    success = true;

    // Sending Response
    res.status(200).json({ success: success, Authtoken: authtoken });
  } catch (error) {
    res.status(500).json({ success: success, message: error.message });
  }
};

module.exports = signin;
