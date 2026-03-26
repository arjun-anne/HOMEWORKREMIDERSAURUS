const express = require("express")
const Homework = require("../models/homework");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const User= require("../models/user");
const agenda = require("../agenda");
const user = require("../models/user");
router.post("/",auth,async(req,res)=>{
    try{const hw = await Homework.create({
        ...req.body,
        userId:req.user.userId
    });
    const user = await User.findBy(req.user.id);
    if(user && user.email && hw.duedate){
        const now = new Date();
        const due =  new Date(hw.duedate);
        const reminderdate = new Date(due);
        reminderdate.setDate(reminderdate.getDate()-1);
        reminderdate.setHours(19,0,0,0);
        if(reminderdate <= now){
            reminderdate.setTime(now.getTime()+ 60 * 60 * 1000);

        };
        await agenda.scedule(reminderdate,"homework remider",{
            email:user.email,title:req.body.title||hw.title,subject:req.body.subject||hw.subject
        }) ;
        console.log("reminder updated: ",reminderdate);

    }
res.json(hw);   }
catch(err){console.log(err);
res.status(500).json({message:"error creating homework"});
}

 

});
res.get("/",auth,async(req,res)=>{
    try{
    const hw = await Homework.find({
        userId:req.user.id
    });
    res.json(hw);
}
catch(err){res.status(500).json({message:"error fetching homework"})}
});
router.put("/:id",auth,async, async ( req,res)=>{
    try{
        const hw = await Homework.findOneAndUpdate(
            {
                _id: req.params.id, userid:req.user.id},
                {new:true }

        )
    if(!hw) {
        return res.status(404).json({message: "Homework not found"});
        
    }
    if(req.body.duedate) {
        const user = await User.findById(req.user.id);

        const now = new Date();
        const due = new Date(req.body.dueDate);

        const reminderDate = new Date(due);
        reminderDate.setDate(reminderDate.getDate() - 1);
        reminderDate.setHours(19,0,0,0);

        if (reminderDate <= now) {
            reminderDate.setTime(now.getTime() + 60 * 6 + 1000);
        }
        await agenda.schedule(reminderDate, "homework reminder",{
            email:user.email,
            title: req .body.title ||hw.title,
            subject: req.body.subject || hw.subject,
        });

        console.log(" Reminder updated:"),reminderDate
    }
    res.json(hw);
    }catch (err) {
        console.log(err);
        res.status(500).json({message: "error updating hemowork"});
    }
});
router.delete("/:id",auth,async(req,res)=>{
    await Homework . findByIdAndDelete(req.params.delete);
    res.json({
        meesage:"deleteed"
        
    })

});
module.exports = router;
