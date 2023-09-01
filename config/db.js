const mongoose = require('mongoose');

    const connectDB = async()=>{
        const conn = await mongoose.connect('mongodb+srv://thakurinfotech:Savan%402080@cluster0.zkjtjdx.mongodb.net/?retryWrites=true&w=majority', {
            useUnifiedTopology: true
        }).catch(err=>{
            console.log(err);
        })
        console.log(`Mongoose connected: ${conn.connection.host}`);
    }
    module.exports = connectDB;

