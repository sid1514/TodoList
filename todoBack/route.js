const express=require("express")
const route=express.Router();
const Todo=require("./todoList")
require("./conn")
route.get("/",(req,res)=>{
    res.send("home page")
})

route.post("/addTask",async(req,res)=>{
    try{
        const {Tid,TName,TDate}=req.body;
        let task=new Todo({Tid,TName,TDate})
        await task.save()
        res.send("task added")
    }catch(e){
        console.log(e)
        res.send("not added")
    }
})
route.get("/getMaxTaskId", async (req, res) => {
  try {
   
    const maxUserIdUser = await Todo.aggregate([
      { $sort: { Tid: -1 } },
      { $limit: 1 }
    ]);
    
   
    res.send(maxUserIdUser);
  } catch (e) {
   
    console.log(e);
    res.send("error");
  }
});

route.get("/getTasks",async(req,res)=>
{
     try{
    let t=await Todo.find()
    res.send(t)

} catch(e){
    console.log(e)
    res.send("empty")
}
}
)

route.get("/getMaxTaskId", async (req, res) => {
    try {
      const maxUserIdUser = await Todo.aggregate([
        { $sort: { Tid: -1 } },
        { $limit: 1 }
      ]);
      
      res.send(maxUserIdUser);
    } catch (e) {
      console.log(e);
      res.send("error");
    }
  });

  route.delete("/deleteTask/:nm",async(req,res)=>{
    try{
      const {nm}=req.params;
      let Data=await Todo.findOne({TName:nm})
     if (Data) {
  let id = Data._id;
  await Todo.findByIdAndDelete(id);
  res.send("Record removed");
} else {
  res.status(404).send("Task not found");
}

    }
    catch(error){
      console.log(error.message)
    }
  })

  route.put("/updateTask/:nm",async(req,res)=>{
    try{
      const {nm}=req.params;
   let Data=await Todo.findOne({TName:nm})
      if(Data){
        let id= Data._id;
       
        await Todo.findByIdAndUpdate(id,req.body,{
          new:true
        });
       
      res.status(200).json({ success: true, message: 'Task updated successfully'});
      }else{
        res.send("not found")
      }
    }catch(e){
      console.log(e);
    }
  })

  
module.exports=route;