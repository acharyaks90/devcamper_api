
const express = require('express');
const { getReviews,getReview } = require('../controller/reviews');
const Review = require('../models/Review');
const advanceResults = require('../middleware/advanceResults');

const router = express.Router({mergeParams: true});
const { protect, authorize} = require('../middleware/auth');
 

router.route('/').get(advanceResults(Review,'reviews'),getReviews);
router.route('/:id').get(getReview);

module.exports = router;