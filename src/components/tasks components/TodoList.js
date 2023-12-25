import { Button, Input, Message,Icon } from "semantic-ui-react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import TaskCard from "./TaskCard";


import "./TaskList.css"
const Todo=()=>{
const [Tname,setTask]=useState('');
const [ETid,setTid]=useState()
const [Maxtask,setMaxTask]=useState([])
const [tasks,setTasks]=useState([])
const [Emessage,setEmessage]=useState(false)
const [toggleBtn,setToggleBtn]=useState(true)
const [editTask,seteditTask]=useState();
  try{ 
    fetch("http://localhost:5000/getTasks")
   .then((res)=>res.json())
   .then((temp)=>setTasks(temp))
   .catch((e)=>console.log(e))
   
  }catch(error){
   console.error('Error fetching data:', error)
  }
  
     


   useEffect(()=>{
   try{ 
    
   fetch("http://localhost:5000/getMaxTaskId")
    .then((res)=>res.json())
    .then((temp)=>setMaxTask(temp))
    .catch((e)=>console.log(e))
    console.log(Maxtask[0].Tid)
    
   }catch(error){
    console.error('Error fetching data:', error)
   }
   },[])
      

 
  
    const add=async()=>{
      

       
     
      
      const taskName = Tname;
      const actualDate=new Date()
      const todayD=actualDate.toString()
          
      if (taskName ) {
        
        //const Tid = Maxtask[0].Tid + 1; 
        const Tid =actualDate.getTime().toString();
       await axios.post("http://localhost:5000/addTask", { Tid, TName: taskName,
        TDate:todayD })
        .then(response => {
          setTask(' ')
                console.log(response.data);
              })
              .catch(error => {
                console.error('Error adding task:', error);
              });
              setEmessage(false)
          
              if(!toggleBtn){

                await  axios.delete(`http://localhost:5000/deleteTask/${editTask.TName}`);
              }
              setTask('')
          }else{
            setEmessage(true)
          
        }
        setToggleBtn(true)
    }

    const deleteTask=async(nm)=>{
  
      try {
    await axios.delete(`http://localhost:5000/deleteTask/${nm}`);
    
  } catch (error) {
    console.error('Error deleting task:', error);
   
  }
    }

    const deletAllTask=()=>{
      try{
        axios.delete('http://localhost:5000/deleteAll')
      }catch(e){
        console.log(e)
      }
    }
  
    const EditTask=(Tid)=>{
    
      setToggleBtn(false)
      let edittask=tasks.find((t)=>{
        return t.Tid==Tid;
      })
      setTask(edittask.TName)
      setTid(edittask.Tid)
     seteditTask(edittask)
     
    }
    return(
        <>
        <div className="tasks_container">
        <h1 style={{fontSize:"50px",fontFamily:"cursive"}}>To-Do List</h1>
        <p style={{fontSize:"20px",fontFamily:"cursive",color:"ButtonText"}}>Your task's list and reminder </p>
        
        <section>
        <Input type="text" value={Tname} onChange={(e)=>setTask(e.target.value) } style={{width:"30%",margin:"10px",height:"50px"}}></Input>
       { toggleBtn ?<Button onClick={add} inverted color='black' size="small"><h3>Add task</h3></Button> : <Icon name="edit" size="large" onClick={add}/>}
        <Button  color='red' size="small" onClick={deletAllTask}><h3>Clear List</h3></Button>
       { Emessage? <Message negative size="tiny" color="red" style={{width:"200px"}}>
    <Message.Header >Unable to add empty task</Message.Header>
    
  </Message> :null }
        </section>
        <section >

          <div className="tasks" key={tasks.Tid} >
            {
              tasks.length? tasks.map((t)=> <TaskCard Tid={t.Tid} Tname={t.TName} Tdate={t.TDate} deleteTask={deleteTask} EditTask={EditTask}/> ):null
            }
          </div>
        </section>
        </div>

        </>
    )
}
export default Todo;
