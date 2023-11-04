const Bootcamp = require('../models/Bootcamp');
const geocoder = require('../utils/geocoder');
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
    console.log(req.query);
    let reqQuery = {...req.query};
    // Field to exclude 
    const removeFields = ['select', 'sort', 'limit', 'page'];
    removeFields.forEach(param => delete reqQuery[param]);
    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match=> `$${match}`);
    //{{URL}}/api/v1/bootcamps?averageCost[gte]=9000 averageCost added in json and then api start working

    let query = Bootcamp.find(JSON.parse(queryStr)).populate('courses');
    if(req.query.select) {
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
    }
   console.log(query.select);

   if(req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
    } else {
        query = query.sort('-createdAt');
    }

     // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Bootcamp.countDocuments();


  query = query.skip(startIndex).limit(limit);

    const bootcamps = await query;

    const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }
   
    res.status(200)
        .json({'success':true, data: bootcamps, count: bootcamps.length, pagination });

   
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
    
        const bootcamp = await Bootcamp.findById(req.params.id);
        if(!bootcamp){
            return res.status(400).json({
                 'success':false
             }); 
         }
         bootcamp.deleteOne();
        res.status(200).json({'success':true, data: {}});
    })

    // @desc GET bootcamp WITHIN A RADIUS
// @route GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access PRIVATE
exports.getBootcampsInRadius = asyncHandler(async (req, res, next)=>{
    const { zipcode, distance} = req.params;
    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;

    // calculate radius using radian
    // divide distance by radius of earth
    // radius of earth 3963 miles
    const radius = distance / 3963;

    const bootcamps = await Bootcamp.find({
        location: {  $geoWithin: { $centerSphere: [ [ lng, lat ],radius ] }}
    });
    if(!bootcamps){
        return res.status(400).json({
             'success':false
         }); 
     }
    res.status(200).json({'success':true, data: bootcamps});
})

// @desc Upload photo for bootcamp
// @route PUT /api/v1/bootcamps/:id/photo
// @access PRIVATE
exports.bootcampPhotoUpload = asyncHandler(async (req, res, next)=>{
    
    const bootcamp = await Bootcamp.findById(req.params.id);
    if(!bootcamp){
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
     }
     if(!req.files){
        return next(new ErrorResponse(`Please upload a file`, 400))
     }
     const file = req.files.file;
     console.log(file);
   
     if(!file.mimetype.startsWith('image')){
        return next(new ErrorResponse(`Please upload a an image`, 400))
     }
     if (file.size > process.env.MAX_FILE_UPLOAD) {
        return next(new ErrorResponse(`Please upload a an image LESS THAN ${process.env.MAX_FILE_UPLOAD}`, 400))
     }
    res.status(200).json({'success':true, data: {}});
})