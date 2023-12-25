const mongoose=require("mongoose")

const TodoList=mongoose.Schema({


    Tid:{type:String},
    TName:{type:String},
    TDate:{type:Date},
})

const Todo=new mongoose.model("Todo",TodoList);
module.exports=Todo;