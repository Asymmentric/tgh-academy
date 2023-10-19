import mongoose, { Schema, model } from "mongoose";

export interface ITask {
    title:string,
}

const taskSchema: Schema = new mongoose.Schema<ITask>({
    title:{type:String,required:true}
})

export const taskModel=mongoose.model('tasks',taskSchema)
