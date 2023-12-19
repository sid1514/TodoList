import { configureStore } from "@reduxjs/toolkit";
import TaskSlice from "./TaskSlice";

const store= configureStore({
    reducer:{
       Tflag: TaskSlice, 
    },
})

export default store;