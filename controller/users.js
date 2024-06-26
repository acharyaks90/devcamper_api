const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

// @desc Get all users
// @route GET /api/v1/auth/users
// @access private/Admin
exports.getUsers = asyncHandler(async ( req, res, next)=>{

    
    res.status(200).json(res.advanceResults);
  
});

// @desc Get  user
// @route GET /api/v1/auth/users/:id
// @access private/Admin
exports.getUser = asyncHandler(async ( req, res, next)=>{
    
    const user = await User.findById(req.params.id);
    res.status(200).json(
        {
            success: true,
            data: user
        }
    );
  
});

// @desc create  user
// @route POST /api/v1/auth/users
// @access private/Admin
exports.createUser = asyncHandler(async ( req, res, next)=>{
    const user = await User.create(req.body);
    res.status(201).json(
        {
            success: true,
            data: user
        }
    );
  
});

// @desc update  user
// @route PUT /api/v1/auth/users
// @access private/Admin
exports.updateUser = asyncHandler(async ( req, res, next)=>{
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    res.status(200).json(
        {
            success: true,
            data: user
        }
    );
  
});

// @desc delete  user
// @route DELETE /api/v1/auth/users
// @access private/Admin
exports.deleteUser = asyncHandler(async ( req, res, next)=>{
    const user = await User.findById(req.params.id);
    
    if(!user){
        return next(new ErrorResponse(`No user with id of ${req.params.id}`), 404);
    }
    await user.deleteOne();
    res.status(200).json(
        {
            success: true,
            data: {}
        }
    );
  
});