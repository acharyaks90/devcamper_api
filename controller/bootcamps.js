const Bootcamp = require('../models/Bootcamp');
// @desc get all bootcamps
// @route GET /api/v1/bootcamps
// @access PUBLIC
exports.getBootcamps = async (req, res, next)=>{
    try{ 
        const bootcamps = await Bootcamp.find();
        //res.status(200).json({'success':true, msg: 'Bootcamp created'});
        res.status(200).json({'success':true, data: bootcamps});
        } catch(err) {
            res.status(400).json({
                'success':false
            });
        }
   
}

// @desc create bootcamp
// @route GET /api/v1/bootcamps
// @access PRIVATE
exports.createBootcamp = async (req, res, next)=>{
    //console.log(req.body);
    try{ 
    const bootcamp = await Bootcamp.create(req.body);
    //res.status(200).json({'success':true, msg: 'Bootcamp created'});
    res.status(201).json({'success':true, data: bootcamp});
    } catch(err) {
        res.status(400).json({
            'success':false
        });
    }
}

// @desc get bootcamp
// @route GET /api/v1/bootcamps/:id
// @access PUBLIC
exports.getBootcamp = async (req, res, next)=>{

    try{ 
        const bootcamp = await Bootcamp.findById(req.params.id);
        //res.status(200).json({'success':true, msg: 'Bootcamp created'});
        if(!bootcamp){
           return res.status(400).json({
                'success':false
            }); 
        }
        res.status(200).json({'success':true, data: bootcamp});
        } catch(err) {
            res.status(400).json({
                'success':false
            });
        }
   
}

// @desc update bootcamp
// @route GET /api/v1/bootcamps/:id
// @access PRIVATE
exports.updaeteBootcamp = async (req, res, next)=>{

    try{ 
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
        } catch(err) {
            res.status(400).json({
                'success':false
            });
        }
   
}

// @desc delete bootcamp
// @route GET /api/v1/bootcamps/:id
// @access PRIVATE
exports.deleteBootcamp = (req, res, next)=>{
    res.status(200).json({'success':true, msg: `Bootcamp deleted ${req.params.id}`});
}