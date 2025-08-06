const express=require("express");
const router=express.Router();

//Index-users
router.get("/",(req,res)=>{
    res.send("GET for posts");
});

//show users
router.get("/:id",(req,res)=>{
    res.send("GET for post id");
});

//post users
router.post("/",(req,res)=>{
    res.send("post for posts");
});

//delete users
router.delete("/:id",(req,res)=>{
    res.send("delete for post id");
});

module.exports=router;