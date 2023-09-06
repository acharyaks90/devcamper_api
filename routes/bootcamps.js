const express = require('express');
const { getBootcamps, createBootcamp, getBootcamp, updaeteBootcamp, deleteBootcamp, getBootcampsInRadius } = require('../controller/bootcamps')
const router = express.Router();

// router.get('/', (req, res)=>{
   
//     res.status(200).json({'success':true, msg: `Bootcamp deleted ${req.params.id}`});
// })

router.route('/').get(getBootcamps)
                .post(createBootcamp);
router.route('/:id').get(getBootcamp)
                    .put(updaeteBootcamp)
                    .delete(deleteBootcamp);
router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

module.exports = router;