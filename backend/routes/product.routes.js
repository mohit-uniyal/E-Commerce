const router=require('express').Router();
const { createProductController } = require('../controller/product.controller');
const upload = require('../middlewares/multer.middleware');
const { verifyJWT, verifyAdmin } = require('../middlewares/user.middleware');


router.post('/create-product', verifyJWT, verifyAdmin, upload.single('image'), createProductController);

module.exports=router;