const express = require('express');
const { register, login, getMe, forgetPassword,resetPassword} = require('../controller/auth');
const router = express.Router();
 const {protect} = require('../middleware/auth')
router.post('/register', register);
router.post('/login',login);
router.get('/me',protect,getMe);
router.post('/forgetpassword',forgetPassword);
router.put('/resetpassword/:resettoken',resetPassword);

module.exports = router;