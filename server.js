const express = require("express");
const dotenv = require("dotenv");

//Load env vars
dotenv.config({path: './config/config.env'});

const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server runnning in ${process.env.NODE_ENV} mode on port ${PORT}`);
})

app.get('/', (req, res)=>{
    //res.send('Hello');
    res.json({name:'Krish'});
});

app.get('/api/v1/bootcamps', (req, res)=>{
   
    res.status(200).json({'success':true, msg: 'Show all bootcamps'});
})

app.post('/api/v1/bootcamps', (req, res)=>{
   
    res.status(200).json({'success':true, msg: 'Bootcamp created'});
})

app.put('/api/v1/bootcamps/:id', (req, res)=>{
   
    res.status(200).json({'success':true, msg: `Bootcamp created ${req.params.id}`});
})
app.delete('/api/v1/bootcamps/:id', (req, res)=>{
   
    res.status(200).json({'success':true, msg: `Bootcamp deleted ${req.params.id}`});
})