const mongoose = require('mongoose');

const homework = new mongoose.Schema({
    subject:String,
    title:String,
    duedate:Date,
    userId:mongoose.Schema.Types.ObjectId
});
module.exports = mongoose.model("homework",homework)