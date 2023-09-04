const ErrorResponse = require('../utils/errorResponse');
const errorHandler = (err, req, res, next) =>{
    let error = {...err};
    error.message = err.message;
    //log to console for dev
    console.log(err.stack.red);
    // Mongoose bad Object id
    if(err.name === 'CastError'){
        const message = `Boot camp not found with id of ${err.value}`;
        error = new ErrorResponse(message, 404);
    }
    if(err.code === 11000){
        const message = `Duplicate field value entered`;
        error = new ErrorResponse(message, 400);
    }
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    });
}

module.exports = errorHandler;