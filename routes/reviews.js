
const express = require('express');
const { getReviews, getReview, addReview } = require('../controller/reviews');
const Review = require('../models/Review');
const advanceResults = require('../middleware/advanceResults');

const router = express.Router({mergeParams: true});
const { protect, authorize} = require('../middleware/auth');
 

router.route('/').get(advanceResults(Review),getReviews).post(protect, authorize('user', 'admin'),addReview);
router.route('/:id').get(getReview);

module.exports = router;