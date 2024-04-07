
const express = require('express');
const { getReviews, getReview, addReview, updateReview, deleteReview } = require('../controller/reviews');
const Review = require('../models/Review');
const advanceResults = require('../middleware/advanceResults');

const router = express.Router({mergeParams: true});
const { protect, authorize} = require('../middleware/auth');
 

router.route('/').get(advanceResults(Review),getReviews).post(protect, authorize('user', 'admin'),addReview);
router.route('/:id').get(getReview).put(protect, authorize('user', 'admin'), updateReview).delete(protect, authorize('user', 'admin'),deleteReview);

module.exports = router;