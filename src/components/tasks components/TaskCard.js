import { Button, CardDescription } from "semantic-ui-react";
import './TaskList.css'

import { useState } from "react";

import {Card,Icon} from "semantic-ui-react";
const TaskCard=({Tname,deleteTask,EditTask,Tdate,Tid})=>{
   
   
   
  
  const [displayBt,setDisplayBt]=useState(false)
     
    const taskD= new Date(Tdate)
    const day=taskD.getDate() + "/"+taskD.getMonth()+"/"+taskD.getFullYear()
      
    return(<>
    <div className="task_structure" onMouseEnter={()=>setDisplayBt(true)} onMouseLeave={()=>setDisplayBt(false)}>
   
        <Card >
    <Card.Content header="" />
    <CardDescription ><h2> {Tname} <aside>{displayBt? <Icon name="edit" onClick={()=>{EditTask(Tid)}} />:null}</aside> </h2>
   
    </CardDescription>
    <Card.Content extra textAlign="right" >
    <h5><Icon name='time' />{day}</h5>
    </Card.Content>
    {displayBt? <Button onClick={()=>deleteTask(Tname)} className="delete_bt"  ><Icon name='remove circle' color="red" size="large"></Icon></Button>
    :null}
    
    </Card>
    </div>
    </>)
}

export default TaskCard;