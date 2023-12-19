import { createSlice, isAction } from "@reduxjs/toolkit";

const TaskFlag=createSlice({
 name: 'Tflag',
 initialState: false,
 reducers:{
    setFlag:(state,action)=>action.payload,
    toogleFlag:(state)=>!state
 }
})

export const{setFlag,toogleFlag}=TaskFlag.actions;

export  default TaskFlag.reducer;