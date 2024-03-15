const { createCategoryController, updateCategoryController, deleteCategoryController, getCategoriesController } = require('../controller/category.controller');
const { verifyJWT, verifyAdmin } = require('../middlewares/user.middleware');

const router=require('express').Router();

router.post('/create-category', verifyJWT, verifyAdmin, createCategoryController);
router.post('/update-category', verifyJWT, verifyAdmin, updateCategoryController);
router.post('/delete-category', verifyJWT, verifyAdmin, deleteCategoryController);
router.get('/get-categories', getCategoriesController);

module.exports=router;