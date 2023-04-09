const signUp = require('../functions/User/Signup')
const signIn = require('../functions/User/Signin')
const getProfile = require('../functions/User/Getprofile')
const EditProfile = require("../functions/User/Editprofile")
const EditProfileImage = require('../functions/User/Editprofileimage')
const Deleteprofile = require('../functions/User/Deleteprofile')

const signup = async(req, res)=>{
    await signUp(req, res)
}

const signin = async(req, res)=>{
    await signIn(req, res)
}

const getprofile = async(req, res)=>{
    await getProfile(req, res)
}
const editprofile = async(req, res)=>{
    await EditProfile(req, res)
}
const editprofileimage = async(req, res)=>{
    await EditProfileImage(req, res)
}
const deleteprofile = async(req, res) => {
    await Deleteprofile(req, res)
}

module.exports = { signup, signin, getprofile, editprofile, editprofileimage, deleteprofile }