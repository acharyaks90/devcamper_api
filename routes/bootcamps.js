const express = require('express');
const { getBootcamps, createBootcamp, getBootcamp, updaeteBootcamp, deleteBootcamp, getBootcampsInRadius, bootcampPhotoUpload } = require('../controller/bootcamps');
const Bootcamp = require('../models/Bootcamp');
const advanceResults = require('../middleware/advanceResults');
const courseRouter = require('./courses');
const router = express.Router();

// router.get('/', (req, res)=>{
   
//     res.status(200).json({'success':true, msg: `Bootcamp deleted ${req.params.id}`});
// })

router.use('/:bootcampId/courses',courseRouter);
router.route('/').get(advanceResults(Bootcamp,'courses'),getBootcamps)
                .post(createBootcamp);
router.route('/:id').get(getBootcamp)
                    .put(updaeteBootcamp)
                    .delete(deleteBootcamp);
router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);
router.route('/:id/photo').put(bootcampPhotoUpload);

module.exports = router;