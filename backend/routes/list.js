const router=require("express").Router();
const User = require("../models/user");
const List=require("../models/list.js");


//create Task
router.post("/addTask",async(req,res)=>{
    try{
        const {title,body,id}=req.body;
        const existingUser = await User.findById(id);
        if(existingUser){
            const list=new List({title,body,user:existingUser});
            await list.save().then(()=>res.status(200).json({list}));
            existingUser.list.push(list);
            await existingUser.save();
        }
    }
    catch(error){
        console.log(error);
    }
})

//update Task
router.put("/updateTask/:id",async(req,res)=>{
    try{
        const {title,body}=req.body;
        const list=await List.findByIdAndUpdate(req.params.id,{title,body})
        list.save().then(()=>res.status(200).json({message : "Task Updated"}));
        
    }catch(error){
        console.log(error);
    }
});


//delete Task
router.delete("/deleteTask/:id",async(req,res)=>{
    try{
        const {id}=req.body;
        const existingUser = await User.findByIdAndUpdate(id,{$pull:{list:req.params.id}});
        if(existingUser){
            await List.findByIdAndDelete(req.params.id).then(()=>{
                res.status(200).json({message:"Task Deleted"});
            })
        } 
    }catch(error){
        console.log(error);
    }
})

//show all the tasks
router.get("/getTasks/:id",async(req,res)=>{
    try{
        const list = await List.find({user:req.params.id}).sort({createdAt: -1});
        if(list.length !==0){
            res.status(200).json({list: list});
        }
        else{
            res.status(200).json({message : "No Tasks Found"});
        }
    }catch(error){
        console.log(error);
    }
});
module.exports = router;