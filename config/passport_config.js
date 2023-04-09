const passport = require('passport')
const GoogleStrategy = require("passport-google-oauth20").Strategy
var GitHubStrategy = require('passport-github').Strategy;
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

passport.serializeUser((user , done) => {
    done(null , user);
})

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:5001/api/v1/user/signin/google/callback",
    passReqToCallback: true
}, function (request, accessToken, refreshToken, profile, done) {
    console.log(profile);
    return done(null, profile)
}
))

passport.use(new GitHubStrategy({
    clientID: process.env.GitHub_CLIENT_ID,
    clientSecret: process.env.GitHub_CLIENT_SECRET,
    callbackURL: "http://localhost:5001/api/v1/user/signin/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    return cb(null, profile);
  }
));

passport.use(new LinkedInStrategy({
  clientID: process.env.LinkedIn_CLIENT_ID,
  clientSecret: process.env.LinkedIn_CLIENT_SECRET,
  callbackURL: "http://localhost:5001/api/v1/user/signin/linkedin/callback",
  scope: ['r_emailaddress', 'r_liteprofile'],
}, function(accessToken, refreshToken, profile, done) {
  console.log(profile);
  return done(null, profile);
}));



