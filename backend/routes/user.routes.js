const router=require('express').Router();
const { registerController, loginController, userDetailsController } = require('../controller/user.controller');
const { verifyJWT } = require('../middlewares/user.middleware');


router.post('/register', registerController);

router.post('/login', loginController);

router.get('/userDetails', verifyJWT, userDetailsController);

module.exports=router;