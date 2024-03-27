const dotenv = require("dotenv");
const express = require("express");
const bootcampsRoutes = require('./routes/bootcamps');
const coursesRoutes = require('./routes/courses');
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/error');
const morgan = require('morgan');
const colors = require('colors');
const fileUpload = require('express-fileupload')
const connectDB = require('./config/db')
const path = require('path');
const cookieParser = require('cookie-parser');
//Load env vars
dotenv.config({path: './config/config.env'});

//connect to db
connectDB();

const app = express();
const PORT = process.env.PORT;

const server = app.listen(PORT, ()=>{
    console.log(`Server runnning in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});
//Body parser
app.use(express.json());
// Cookie parser
app.use(cookieParser())
app.use(logger);
if(process.env.NODE_ENV == 'development'){
    app.use(morgan('dev'))
}
//File Upload
app.use(fileUpload());
app.use(express.static(path.join(__dirname, 'public')))
app.use('/api/v1/bootcamps', bootcampsRoutes);
app.use('/api/v1/courses', coursesRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', usersRoutes);
app.use(errorHandler);

app.get('/', (req, res)=>{
    //res.send('Hello');
    res.json({name:'Krish'});
});

app.get('/anil', (req, res)=>{
    //res.send('Hello');
    res.json({name:'Anilnpm'});
});

process.on('unhandledRejection', (err, promise)=>{
    console.log(`Error: ${err.message}`.red);
    server.close(()=> process.exit(1));
})

