const Bootcamp = require('../models/Bootcamp');
const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse');
// @desc get all bootcamps
// @route GET /api/v1/bootcamps
// @access PUBLIC
exports.getBootcamps = asyncHandler(async (req, res, next)=>{
    // try{ 
    //     const bootcamps = await Bootcamp.find();
    //     //res.status(200).json({'success':true, msg: 'Bootcamp created'});
    //     res.status(200).json({'success':true, data: bootcamps, count: bootcamps.length });
    //     } catch(err) {
    //         // res.status(400).json({
    //         //     'success':false
    //         // });
    //         next(err);
    //     }
    const bootcamps = await Bootcamp.find();
   
    res.status(200)
        .json({'success':true, data: bootcamps, count: bootcamps.length });

   
})

// @desc create bootcamp
// @route GET /api/v1/bootcamps
// @access PRIVATE
exports.createBootcamp = asyncHandler(async (req, res, next)=>{

    const bootcamp = await Bootcamp.create(req.body);
 
    res.status(201).json({'success':true, data: bootcamp});
   
});

// @desc get bootcamp
// @route GET /api/v1/bootcamps/:id
// @access PUBLIC
exports.getBootcamp = asyncHandler(async (req, res, next)=>{

   
        const bootcamp = await Bootcamp.findById(req.params.id);
        //res.status(200).json({'success':true, msg: 'Bootcamp created'});
        if(!bootcamp){
            next(new ErrorResponse(`Boot camp not found with id of ${req.params.id}`, 404)); 
        }
        res.status(200).json({'success':true, data: bootcamp});
   
})

// @desc update bootcamp
// @route GET /api/v1/bootcamps/:id
// @access PRIVATE
exports.updaeteBootcamp = asyncHandler(async (req, res, next)=>{

 
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if(!bootcamp){
            return res.status(400).json({
                 'success':false
             }); 
         }
        res.status(200).json({'success':true, data: bootcamp});
        
   
})

// @desc delete bootcamp
// @route GET /api/v1/bootcamps/:id
// @access PRIVATE
exports.deleteBootcamp = asyncHandler(async (req, res, next)=>{
    
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
        if(!bootcamp){
            return res.status(400).json({
                 'success':false
             }); 
         }
        res.status(200).json({'success':true, data: {}});
    })