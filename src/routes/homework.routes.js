const express = require("express")
const Homework = require("../models/homework");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
router.post("/",auth,async(req,res)=>{
    const hw = await Homework.create({})
})