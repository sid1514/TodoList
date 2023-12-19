import { Button, Input } from "semantic-ui-react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import TaskCard from "./TaskCard";
import { useSelector,useDispatch } from "react-redux";
import { setFlag } from "./TaskSlice";
import "./TaskList.css"
const Todo=()=>{
const [Tname,setTask]=useState();
//const [Tid,setTid]=useState()
const [Maxtask,setMaxTask]=useState([])
const [tasks,setTasks]=useState([])

const dispatch=useDispatch();

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
           if (taskName) {
          const Tid = Maxtask[0].Tid + 1;
             await axios.post("http://localhost:5000/addTask", { Tid, TName: taskName,
            TDate:todayD })
              .then(response => {
                console.log(response.data);
               })
              .catch(error => {
                console.error('Error adding task:', error);
              });
          }
    }

    const deleteTask=async(nm)=>{
      
      
      
      try {
    await axios.delete(`http://localhost:5000/deleteTask/${nm}`);
    
  } catch (error) {
    console.error('Error deleting task:', error);
   
  }
    }

  /*   const updateTask=async(nm,uTask)=>{
        dispatch(setFlag(true))
          try {
      await axios.put(`http://localhost:5000/updateTask/${nm}`,uTask);
      
    } catch (error) {
      console.error('Error deleting task:', error);
     
    }
      } */
    return(
        <>
        <div className="tasks_container">
        <h1>TodoList</h1>

        <h1>{Tname}</h1>
        <section>
        <Input type="text" onChange={(e)=>setTask(e.target.value)}></Input>
        <Button onClick={add}>add task</Button>
        </section>
        <section>

          <div>
            {
              tasks.length? tasks.map((t)=> <TaskCard Tname={t.TName} Tdate={t.TDate} deleteTask={deleteTask} /> ):null
            }
          </div>
        </section>
        </div>

        </>
    )
}
export default Todo;
