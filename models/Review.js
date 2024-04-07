const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    title: {
        type:String,
        required:[true, 'Please add a title for review'],
        trim: true,
        maxlength : [100, 'Name can not more than 50 characters']
    },
    text:{
        type:String,
        required:[true, 'Please add some text'],
        maxlength : [500, 'Description can not more than 100 characters']
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

// Prevent use from submiting more one review
ReviewSchema.index({bootcamp: 1, user: 1}, {unique:true});

ReviewSchema.statics.getAverageRating = async function(bootcampId){
  console.log('Calculating average cost.....'.blue);
  const obj = await this.aggregate([
      {
          $match: { bootcamp: bootcampId}
      },{
          $group:{
              _id: '$bootcamp',
              averageRating: {$avg: '$rating'}
          }
      }
  ])
  console.log(obj)
  try {
      await this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
          averageRating: obj[0].averageRating
      })
  } catch (error) {
      console.error(error);
  }
}
ReviewSchema.pre('save', function(){
  this.constructor.getAverageRating(this.bootcamp);
})
ReviewSchema.pre('remove', function(){
  this.constructor.getAverageRating(this.bootcamp);
})

module.exports = mongoose.model('Review', ReviewSchema);