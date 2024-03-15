const router=require('express').Router();
const { createProductController, getAllProductsController, updateProductController, deleteProductController } = require('../controller/product.controller');
const upload = require('../middlewares/multer.middleware');
const { verifyJWT, verifyAdmin } = require('../middlewares/user.middleware');


router.post('/create-product', verifyJWT, verifyAdmin, upload.single('image'), createProductController);

router.get('/get-products', getAllProductsController);

router.post('/update-product', verifyJWT, verifyAdmin, upload.single('image'), updateProductController);

router.get('/delete-product/:id', verifyJWT, verifyAdmin, deleteProductController);

module.exports=router;