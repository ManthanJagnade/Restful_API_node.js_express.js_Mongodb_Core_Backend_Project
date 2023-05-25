const express = require('express');
const app= express();
const studentRoute =require('./api/routes/student');
const facultyRoute =require('./api/routes/faculty');
const userRoute =require('./api/routes/user');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');




app.use('/student',studentRoute);
app.use('/faculty',facultyRoute);
app.use('/user',userRoute);

mongoose.connect('mongodb+srv://manthan:momloveyou..7@sbs.tabzr6n.mongodb.net/');

mongoose.connection.on('error',err=>{
    console.log('connection failed')
});

mongoose.connection.on('connected',connected=>{
    console.log('connected with database.....');
})

app.use(cors());



app.use(express.urlencoded({ extended: false }));
app.use(express.json());




app.use((req,res,next)=>{
    res.status(404).json({
        error:'URL NOT FOUND'
    })
        
})

module.exports= app;

