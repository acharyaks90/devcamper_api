const mongoose = require('mongoose');

const ReviewsSchema = new mongoose.Schema({
    title: {
        type:String,
        required:[true, 'Please add a title for review'],
        trim: true,
        maxlength : [100, 'Name can not more than 50 characters']
    },
    text:{
        type:String,
        required:[true, 'Please add some textt'],
        maxlength : [100, 'Description can not more than 100 characters']
    },
      rating: {
        type: Number,
        min: [1, 'Rating must be at least 1'],
        max: [10, 'Rating must can not be more than 10']
    },
      createdAt: {
        type: Date,
        default: Date.now
      },
      bootcamp:{
        type: mongoose.Schema.ObjectId,
        ref: 'Bootcamp',
        required: true
      },
      user:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
     }
});



module.exports = mongoose.model('Review', ReviewSchema);