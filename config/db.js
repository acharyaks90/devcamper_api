const mongoose = require('mongoose');

    const connectDB = async()=>{
        const conn = await mongoose.connect(process.env.MONGOOSE_URI, {
            useUnifiedTopology: true
        }).catch(err=>{
            console.log(err);
        })
        console.log(`Mongoose connected: ${conn.connection.host}`.cyan.underline.bold);
    }
module.exports = connectDB;

