const addpost = require('../functions/Post/Addpost')
const editpost = require('../functions/Post/Editpost')
const deletepost = require('../functions/Post/Deletepost')
const getpost = require('../functions/Post/Getpost')
const getallpost = require('../functions/Post/Getallposts')

const Addpost = async(req, res) => {
    await addpost(req, res)
}
const Editpost = async(req, res) => {
    await editpost(req, res)
}
const Deletepost = async(req, res) => {
    await deletepost(req, res)
}
const Getpost = async(req, res) => {
    await getpost(req, res)
}
const Getallposts = async(req, res) => {
    await getallpost(req, res)
}

module.exports = { Addpost, Editpost, Deletepost, Getpost, Getallposts }