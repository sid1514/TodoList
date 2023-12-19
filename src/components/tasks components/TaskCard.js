import { Button, GridColumn, GridRow, Input } from "semantic-ui-react";
import './TaskList.css'
import {Grid} from "semantic-ui-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import {Card,Icon} from "semantic-ui-react";
const TaskCard=({Tname,deleteTask,updateTask,Tdate})=>{
   
    const [uTask,setUtask]=useState();
    const uflag=useSelector((state)=>state.Tflag)
   
  const[ TaskD,setTaskDate]=useState();
  const [displayBt,setDisplayBt]=useState(false)
      /*const handleUpdate = () => {
        updateTask(Tname, uTask);
        setUtask(''); // Reset the input after updating
      }; */
    const taskD= new Date(Tdate)
    const day=taskD.getDate() + "/"+taskD.getMonth()+"/"+taskD.getFullYear()
  
    return(<>
    <div className="task_structure" onMouseEnter={()=>setDisplayBt(true)} onMouseLeave={()=>setDisplayBt(false)}>
   
        <Card >
    <Card.Content header="" />
    <Card.Content description= {Tname} />
    <Card.Content extra textAlign="right" >
    <h5><Icon name='time' />{day}</h5>
    </Card.Content>
    {displayBt? <Button onClick={()=>deleteTask(Tname)} className="delete_bt"  ><Icon name='remove circle' color="red" size="large"></Icon></Button>:null}
  </Card> 
    </div>
    </>)
}

export default TaskCard;