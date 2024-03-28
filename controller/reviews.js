const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Review = require('../models/Review');
const Bootcamp = require('../models/Bootcamp')

// @desc Get reviews 
// @route GET /api/v1/courses
// route GET /api/v1/bootcamps/:bootcampId/reviews

exports.getReviews = asyncHandler(async (req, res, next)=>{
    if(req.params.BootcampId) {
        const reviews = await Reviews.find({bootcamp:req.params.BootcampId });
        return res.status(200).json({
            success: true,
            count : reviews.length,
            data: reviews
        })
    } else{
        res.status(200).json(res.advanceResults);
    }
})