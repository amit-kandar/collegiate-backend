const router = require("express").Router();
const user = require('../Controller/usercontroller');
const upload = require('../middleware/uploads')
const verify = require('../middleware/verify')
const passport = require("passport");
const { route } = require("./admin");
const { OAuth2Client } = require("google-auth-library")


const client = new OAuth2Client(process.env.CLIENT_ID)

// SignUp
router.post("/signup", upload.single('profileimage'), user.signup);

// SignIn
router.post("/signin", user.signin)


// Github
router.get('/auth/github', passport.authenticate('github'));

// Auth Callback Github
router.get('/signin/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), function (req, res) {
  // Successful authentication, redirect home.
  console.log("Success");
  res.send("Success");
});

// LinkedIn
router.get('/auth/linkedin', passport.authenticate('linkedin', { state: 'SOME STATE'  }))

router.get('/signin/linkedin/callback', passport.authenticate('linkedin', {
  successRedirect: 'http://localhost:3000/',
  failureRedirect: '/login'
}));

// Google
router.get("/auth/google", passport.authenticate('google', { scope: ['email', 'profile'] })
)

// Auth Callback Google
router.get("/signin/google/callback", passport.authenticate("google", {
  successRedirect: process.env.CLIENT_URL,
  failureRedirect: "/signin/failure",
}))

//success
router.get("/signin/success", (req, res) => {
  if (!req.user)
    res.redirect('/signin/failure');
  res.send("Welcome " + req.user.displayName);
})

//failure
router.get("/signin/failure", (req, res) => {
  res.status(401).send("log in failed!")
})

router.post("/auth/google", async(req, res)=>{
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID
  })

  const { name, email, picture } = ticket.getPayload()
  console.log(picture);
  res.status(200).json({ name: name, email: email, picture: picture })
})

// signout
router.get("logout", (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL)
})


// Profile
router.get("/profile", verify, user.getprofile)

// Edit Profile
router.put('/editprofile', verify, upload.single('profileimage'), user.editprofile)

// Edit Profile Image
router.put('/editprofileimage', verify, upload.single('profileimage'), user.editprofileimage)

// Delete Account
router.delete('/delete/account', verify, user.deleteprofile)

module.exports = router;