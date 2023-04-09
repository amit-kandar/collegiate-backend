const router = require('express').Router()
const post = require('../Controller/postcontroller')
const verify = require('../middleware/verify')
const upload = require('../middleware/uploads')

// Add Post
router.post('/addpost', verify, upload.single('postimage'), post.Addpost)

// Edit Post
router.put('/editpost/:id', verify, upload.single('postimage'), post.Editpost)

// Delete Post
router.delete('/:id', verify, post.Deletepost)

// Get Post
router.get('/posts', verify, post.Getpost)

// Get All Posts
router.get('/allposts', verify, post.Getallposts)

module.exports = router