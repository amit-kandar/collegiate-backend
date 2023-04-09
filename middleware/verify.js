var jwt = require('jsonwebtoken');
const JWT_Sec = process.env.JWT_Sec

const fetchadmin = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        data = jwt.verify(token, JWT_Sec);
        next();
    } catch (error) {
        return res.status(401).send({ error: "Please authenticate using a valid token" })
    }

}


module.exports = fetchadmin;