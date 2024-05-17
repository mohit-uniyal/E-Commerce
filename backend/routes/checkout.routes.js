const { createCheckoutSessionController, paymentCompletionController } = require('../controller/checkout.controller');
const { verifyJWT } = require('../middlewares/user.middleware');

const express=require('express');
const router=require('express').Router();

router.post('/create-checkout-session', verifyJWT, createCheckoutSessionController);

router.post('/payment-done', paymentCompletionController);

module.exports=router;