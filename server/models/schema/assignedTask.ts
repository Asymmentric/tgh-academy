import mongoose, { ObjectId, Schema, model } from "mongoose";

export interface ITaskDetails{
    task:ObjectId,
    student:ObjectId,
    status:string,
    dueDate:Date
}

const assignmentSchema:Schema=new mongoose.Schema<ITaskDetails>({
    task:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:'tasks'
    },
    student:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:'users'
    },
    status:{
        type:String,
        enum:["pending","overdue","completed"],
        default:"pending",
        required:true
    },
    dueDate:{
        type:Date,
        required:true
    }
})

export const assignmentModel=mongoose.model('assingnments',assignmentSchema)
