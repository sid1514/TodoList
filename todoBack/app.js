
const express=require("express")
const route=require("./route.js")
const cors=require("cors")
const app=express()

app.use(express.json())
app.use(cors())
app.use(route)

const port=process.env.port;
app.listen(port,()=>{
    console.log("server on")
})



