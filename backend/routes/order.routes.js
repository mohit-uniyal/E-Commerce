const { getOrdersUserController, getOrdersAdminController, updateOrderStatusController } = require('../controller/order.controller');
const { verifyJWT, verifyAdmin } = require('../middlewares/user.middleware');

const router=require('express').Router();

router.get('/get-orders-user', verifyJWT, getOrdersUserController);

router.get('/get-orders-admin', verifyJWT, verifyAdmin, getOrdersAdminController);

router.post('/update-order-status', verifyJWT, verifyAdmin, updateOrderStatusController);

module.exports=router;