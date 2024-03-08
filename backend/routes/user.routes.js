const router=require('express').Router();
const { registerController, loginController, userDetailsController, logoutController } = require('../controller/user.controller');
const { verifyJWT } = require('../middlewares/user.middleware');


router.post('/register', registerController);

router.post('/login', loginController);

router.get('/logout', verifyJWT, logoutController);

router.get('/userDetails', verifyJWT, userDetailsController);

module.exports=router;