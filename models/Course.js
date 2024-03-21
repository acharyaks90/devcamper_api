const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Please add a course title']
    },
    description: {
        type: String,
        trim: true,
        required: [true, 'Please add description']
    },
    weeks: {
        type: String,
        trim: true,
        required: [true, 'Please add no of weeks']
    },
    tuition: {
        type: Number,
        required: [true, 'Please add a tuition fee']
    },
    minimumSkill: {
        type: String,
        required: [true, 'Please add a minimum skill'],
        enum: ["beginner", "intermediate", "advance"]
    },
    scholarshipAvailable: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    bootcamp:{
        type: mongoose.Schema.ObjectId,
        ref: 'Bootcamp',
        required: true
    },
    URLSearchParams:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }

});
CourseSchema.statics.getAverageCost = async function(bootcampId){
    console.log('Calculating average cost.....'.blue);
    const obj = await this.aggregate([
        {
            $match: { bootcamp: bootcampId}
        },{
            $group:{
                _id: '$bootcamp',
                averageCost: {$avg: '$tuition'}
            }
        }
    ])
    console.log(obj)
    try {
        await this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
            averageCost: Math.ceil(obj[0].averageCost/10)*10
        })
    } catch (error) {
        console.error(error);
    }
}
CourseSchema.post('save', function(){
this.constructor.getAverageCost(this.bootcamp);
})
CourseSchema.pre('deleteOne', {document: true, query: false}, async function(next){
    this.constructor.getAverageCost(this.bootcamp);
    next();
    })
module.exports = mongoose.model('Course', CourseSchema);