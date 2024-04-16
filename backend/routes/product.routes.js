const router=require('express').Router();
const { createProductController, getAllProductsController, updateProductController, deleteProductController, getProductController } = require('../controller/product.controller');
const upload = require('../middlewares/multer.middleware');
const { verifyJWT, verifyAdmin } = require('../middlewares/user.middleware');


router.post('/create-product', verifyJWT, verifyAdmin, upload.single('image'), createProductController);

router.post('/get-products', getAllProductsController);

router.get('/get-product/:id', getProductController);

router.post('/update-product', verifyJWT, verifyAdmin, upload.single('image'), updateProductController);

router.get('/delete-product/:id', verifyJWT, verifyAdmin, deleteProductController);

module.exports=router;