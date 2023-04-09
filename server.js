require("dotenv").config();
require('./config/passport_config')
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const CookieSession = require("cookie-session")
const passport = require("passport")

//PORT
const port = process.env.PORT || 5001;

//Eneble CORS Policy
app.use( cors({ origin: "http://localhost:3000" }))

//Middleware
app.use(express.json()); // parse json bodies in the request object
app.use(express.static(path.join(__dirname, "views")));

// To support URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Google Authentication
app.use(CookieSession({
  name: 'gauth-session',
  keys: ["collegiate"],
  expires: 24 * 60 * 60
}));
app.use(passport.initialize());
app.use(passport.session());

//end point
app.use("/api/v1/admin", require("./Routers/admin"));
app.use("/api/v1/user", require("./Routers/user"));
app.use("/api/v1/post", require("./Routers/post"));
app.use("/api/v1/public", require('./Routers/public'))
// app.use('/api/email', require('./Routers/admin'))

app.get('/',(req,res)=>{
  res.send("test")
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
