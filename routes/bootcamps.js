const express = require('express');
const { getBootcamps, createBootcamp, getBootcamp, updaeteBootcamp, deleteBootcamp, getBootcampsInRadius, bootcampPhotoUpload } = require('../controller/bootcamps');
const Bootcamp = require('../models/Bootcamp');
const advanceResults = require('../middleware/advanceResults');
const courseRouter = require('./courses');
const reviewsRoutes = require('./reviews');
const router = express.Router();
const { protect, authorize} = require('../middleware/auth');
 
// router.get('/', (req, res)=>{
   
//     res.status(200).json({'success':true, msg: `Bootcamp deleted ${req.params.id}`});
// })

router.use('/:bootcampId/courses',courseRouter);
router.use('/:bootcampId/reviews',reviewsRoutes);

router.route('/').get(advanceResults(Bootcamp,'courses'),getBootcamps)
                .post(protect, authorize('publisher','admin'),createBootcamp);
router.route('/:id').get(getBootcamp)
                    .put(protect, authorize('publisher','admin'),updaeteBootcamp)
                    .delete(protect, authorize('publisher','admin'),deleteBootcamp);
router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);
router.route('/:id/photo').put(protect,authorize('publisher','admin'), bootcampPhotoUpload);

module.exports = router;