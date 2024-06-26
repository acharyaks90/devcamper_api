const crypto = require('crypto');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

// @desc Register user
// @route GET /api/v1/auth/register
// @access Public
exports.register = asyncHandler(async ( req, res, next)=>{
    const { name, email, password, role } = req.body;
    //create user 
    const user = await User.create({
        name,
        email,
        password,
        role
    });
    sendTokenResponse(user, 200, res);
});

// @desc Login user
// @route POST /api/v1/auth/login
// @access Public 
exports.login = asyncHandler(async(req, res, next) => {

    const { email, password} = req.body;
    //validate email and password
    if(!email || !password) {
        return next(new ErrorResponse('Please provide email and password', 400));
    }
    // Check for user
    const user = await User.findOne({email}).select('+password');

    if(!user) {
        return next(new ErrorResponse('Invalid credential', 401));
    }
    const isMatch = await user.matchPassword(password);

    if(!isMatch) {
        return next(new ErrorResponse('Invalid credential', 401));
    }

    sendTokenResponse(user, 200, res);
})
// @desc Get current Login user
// @route get /api/v1/auth/me
// @access private 
exports.getMe = asyncHandler(async(req, res, next)=>{
    const user = await User.findById((req.user.id));
    res.status(200).json({
        success: true,
        data: user
    })
})
// @desc log user out
// @route GET /api/v1/auth/logout
// @access private 
exports.logout = asyncHandler(async(req, res, next)=>{
    res.cookie('token', 'none', {
        expires: new Date(Date.now()+10*1000),
        httpOnly:true
    })
    res.status(200).json({
        success: true,
        data: {}
    })
})
// @desc update Login user
// @route PUT /api/v1/auth/updatedetails
// @access private 
exports.updateDetails = asyncHandler(async(req, res, next)=>{
    const fieldsToUpdate = {
        name: req.body.name,
        email: req.body.email
    }
    const user = await User.findByIdAndUpdate((req.user.id, fieldsToUpdate, {
        new: true,
        runValidators: true
    }));
    
    res.status(200).json({
        success: true,
        data: user
    })
})
// @desc PUT UPDATE PASSWORD
// @route get /api/v1/auth/updatepasssword
// @access private 
exports.updatePassword = asyncHandler(async(req, res, next)=>{
    const user = await User.findById((req.user.id)).select('+password');
    if(!await user.matchPassword(req.body.currentPassword)) {
        return next(new ErrorResponse('password is incorrect',401))
    }
    user.password = req.body.newPassword;
    await user.save();
    sendTokenResponse(user, 200, res);
})
// @desc reset password
// @route PUT /api/v1/auth/resetpassword/:resetToken
// @access private 
exports.resetPassword = asyncHandler(async(req, res, next)=>{
    
    //const resetPasswordToken =  req.params.resettoken ;
    const resetPasswordToken =  crypto.createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex');
       console.log(resetPasswordToken);
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {$gt: Date.now()}
       
    });
    // resetPasswordExpire:{$gt: Date.now()}
    if(!user){
        return next(new ErrorResponse('Invalid token', 400));
    }
    // set new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    sendTokenResponse(user, 200, res);
})
// @desc Forget password
// @route POST /api/v1/auth/forgetpassword
// @access pubic 
exports.forgetPassword = asyncHandler(async(req, res, next)=>{
    const user = await User.findOne({email: req.body.email});
    if(!user){
        return next(new ErrorResponse('There is no user with that email', 404));
    }
    const resetToken = user.getResetPasswordToken();
    
    console.log(resetToken);
    //saving in db --
    await user.save({validateBeforeSave: false});
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/resetpassword/${resetToken}`;
    const message = `You are receiving this email because you (or someone else) has request the reset of a password. please make a PUT request to: \n\n ${resetUrl}`;
    try{
        await sendEmail({
        email: user.email,
        subject: 'Password reset token',
        message
        })
    }catch(err){
     console.log(err);
     user.resetToken = undefined;
     user.resetPasswordExpire = undefined;
     await user.save({validateBeforeSave: false});
     return next(new ErrorResponse('Reset password could not be sent', 500));
    }
    res.status(200).json({
        success: true,
        data: user
    })
})

//Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    const options = {
        expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    }
    if(process.env.NODE_ENV === 'production') {
        options.secure = true;
    }
    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token
        });
}
