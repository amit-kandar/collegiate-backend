const session = require("express-session");
const app = require('express')()
var mysql2 = require('mysql2/promise');
const MySQLStore = require('express-mysql-session')(session);

const options = { // Use Good Practices
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASSWORD,
	database: process.env.DB
};
const connection = mysql2.createPool(options);
const store = new MySQLStore({}, connection);

app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        store: store
    })
);

module.exports = isauth=(req, res, next)=>{
    if (req.session.isAuth) {
        next()
    }
    res.redirect('/signin')
}