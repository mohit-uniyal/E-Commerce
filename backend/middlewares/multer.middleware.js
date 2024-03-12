const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/temp')
    },
    filename: function (req, file, cb) {
        const uniquePrefix = Date.now() + '_' + Math.round(Math.random() * 1E9)
        cb(null, uniquePrefix + '_' + file.originalname)
    }
})

const upload = multer({ storage: storage })
module.exports=upload;