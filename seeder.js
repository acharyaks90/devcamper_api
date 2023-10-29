const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors')
const dotenv = require('dotenv');

dotenv.config({path: './config/config.env'});
//LOAD MODELS
const Bootcamp = require('./models/Bootcamp');
const Course = require('./models/Course')

mongoose.connect(process.env.MONGOOSE_URI, {
    useUnifiedTopology: true
})
 //READ JSON FILES

 const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/data/bootcamps.json`, 'utf-8'));
 const courses = JSON.parse(fs.readFileSync(`${__dirname}/data/courses.json`, 'utf-8'));
 // Import into db

 const importData = async() =>{
    try{
            await Bootcamp.create(bootcamps);
           // await Course.create(courses);
            console.log('Data imported'.green.inverse);
    }catch(err){
        console.error(err);
    }
 }
 // Delete data


 const deleteData = async() =>{
    try{
            await Bootcamp.deleteMany();
            await Course.deleteMany();
            console.log('Data Destroyed'.red.inverse);
    }catch(err){
        console.error(err);
    }
 }

 if(process.argv[2] === '-i'){
    importData();
 } else if(process.argv[2] === '-d'){
    deleteData();
 }