const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Review = require('../models/Review');
const Bootcamp = require('../models/Bootcamp')

// @desc Get reviews 
// @route GET /api/v1/reviews
// route GET /api/v1/bootcamps/:bootcampId/reviews

exports.getReviews = asyncHandler(async (req, res, next)=>{
    if(req.params.BootcampId) {
        const reviews = await Review.find({bootcamp:req.params.BootcampId });
        return res.status(200).json({
            success: true,
            count : reviews.length,
            data: reviews
        })
    } else{
        res.status(200).json(res.advanceResults);
    }
})

// @desc Get  review
// @route GET /api/v1/review/:id
// @access Public
exports.getReview = asyncHandler(async ( req, res, next)=>{
    const review = await Review.findById(req.params.id).populate({path:'bootcamp', select: 'name description'});;
    if(!review){
        return next(new ErrorResponse(`No review found the id of ${req.params.id}`),404)
    }
    res.status(200).json(
        {
            success: true,
            data: review
        }
    );
});

// @desc Add Review
// @route POST /api/v1/bootcamps/:bootcampId/reviews
// @access Public
exports.addReview = asyncHandler(async ( req, res, next)=>{
    req.body.bootcamp = req.params.bootcampId;
    req.body.user = req.user.id;
    const bootcamp = await Bootcamp.findById(req.params.bootcampId);
    if(!bootcamp){
        return next(new ErrorResponse(`No Bootcamp found the id of ${req.params.bootcampId}`),404)
    }

    const review = await Review.create(req.body);

    res.status(200).json(
        {
            success: true,
            data: review
        }
    );
});

// @desc update review
// @route PUT /api/v1/reviews/:id
// @access PRIVATE
exports.updateReview = asyncHandler(async (req, res, next)=>{

    let review = await Review.findById(req.params.id);
    if(!review){
        return next(new ErrorResponse(`No review with id of ${req.params.id}`, 401));
     }
     //make sure user belongs review
     if(review.user.toString()!== req.user.id && req.user.role !== 'admin'){
        return next(new ErrorResponse(`User ${req.params.id} is not authorise to update`, 404))
    }
    review = await Review.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    res.status(200).json({'success':true, data: review});
    

})

// @desc delete review
// @route DELETE /api/v1/reviews/:id
// @access PRIVATE
exports.deleteReview = asyncHandler(async (req, res, next)=>{

    const review = await Review.findById(req.params.id);
    if(!review){
        return res.status(400).json({
             'success':false
         }); 
     }
     if(review.user.toString()!== req.user.id && req.user.role !== 'admin'){
        return next(new ErrorResponse(`User ${req.params.id} is not authorise to delete`, 401))
    }
    review.deleteOne();
    res.status(200).json({'success':true, data: {}});
})