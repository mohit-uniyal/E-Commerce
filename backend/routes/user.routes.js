const router=require('express').Router();
const { registerController, loginController, userDetailsController, logoutController, updateUserDetailsController } = require('../controller/user.controller');
const { verifyJWT } = require('../middlewares/user.middleware');


router.post('/register', registerController);

router.post('/login', loginController);

router.get('/logout', verifyJWT, logoutController);

router.get('/userDetails', verifyJWT, userDetailsController);

router.post('/update-user-details', verifyJWT, updateUserDetailsController);

module.exports=router;