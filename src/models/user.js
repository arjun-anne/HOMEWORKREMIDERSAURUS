const mongoose = require('mongoose');
const userschema = new mongoose.Schema({
email:{
    type:String,unique:true
},
password:String
});
module.exports = mongoose.model("user",userschema,);
