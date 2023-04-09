const fetchAdmin = require('../functions/Admin/Fetchadmin')
const signup = require('../functions/Admin/Signup');
const signin = require('../functions/Admin/Signin');


// Sign Up 
const signUp = async(req, res) =>{
    await signup(req, res)
}

// Sign In
const signIn = async(req, res) =>{
    await signin(req, res)
}

// Get Details
const getAdmin = async (req, res) => {
    await fetchAdmin(req, res)
}
module.exports = { signUp, signIn, getAdmin }
