const multer = require('multer')
const path = require('path')


const whitelist = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/webp'
]

const upload = multer({
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/')
        },

        filename: function (req, file, cb) {
            cb(null, Math.random().toString().substring(2, 15) + path.extname(file.originalname))
        }
    }),

    fileFilter: (req, file, cb) => {
        if (!whitelist.includes(file.mimetype)) {
            return cb(new Error('file is not allowed'))
        }
        cb(null, true)
    }
})

module.exports = upload