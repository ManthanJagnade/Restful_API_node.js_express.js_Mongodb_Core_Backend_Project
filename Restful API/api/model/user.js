const mongoose = require('mongoose');
 userSchema= new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    user:String,
    password:String,
    gender:String,
    email:String,
    userType:String,
    phone:Number
    
    
})
 

module.exports = mongoose.model('user',userSchema);