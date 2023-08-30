// @desc get all bootcamps
// @route GET /api/v1/bootcamps
// @access PUBLIC
exports.getBootcamps = (req, res, next)=>{
    res.status(200).json({'success':true, msg: 'Show all bootcamps'});
}

// @desc create bootcamp
// @route GET /api/v1/bootcamps
// @access PRIVATE
exports.createBootcamp = (req, res, next)=>{
    res.status(200).json({'success':true, msg: 'Bootcamp created'});
}

// @desc get bootcamp
// @route GET /api/v1/bootcamps/:id
// @access PUBLIC
exports.getBootcamp = (req, res, next)=>{
    res.status(200).json({'success':true, msg: `Bootcamp is ${req.params.id}`});
}

// @desc update bootcamp
// @route GET /api/v1/bootcamps/:id
// @access PRIVATE
exports.updaeteBootcamp = (req, res, next)=>{
    res.status(200).json({'success':true, msg: `Bootcamp updated ${req.params.id}`});
}

// @desc delete bootcamp
// @route GET /api/v1/bootcamps/:id
// @access PRIVATE
exports.deleteBootcamp = (req, res, next)=>{
    res.status(200).json({'success':true, msg: `Bootcamp deleted ${req.params.id}`});
}