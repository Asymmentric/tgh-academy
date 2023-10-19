import { ObjectId } from "mongoose"
import { assignmentModel } from "../schema/assignedTask"
import { taskModel } from "../schema/taskSchema"
import { userModel } from "../schema/userSchema"

export const assignTask=(task:string,student:ObjectId,dueDate:Date)=>{
    return taskModel.findOne({_id:task})
    .then(task=>{
        if(!task) throw `Task doesn't Exist`
        return userModel.findOne({_id:student})
    })
    .then(userExists=>{
        if(!userExists) throw `Student doesn't exist`
        const newTask=new assignmentModel({
            task,
            student,
            dueDate,
            status:"pending"

        })

        return newTask.save()
    })
    .then(task=>{
        return {msg:'Task assigned'}
    })
    .catch(err=>{
        console.log(err)
        throw err
    })
}

export const fetchAssignments=(student:ObjectId)=>{
    return assignmentModel.find({student}).populate('task')
    .then(result=>{
        return result
    })
    .catch(err=>{
        console.log(err)
        throw err
    })
}

export const updateAssignmentToComplete=(studentId:ObjectId,assignmentId:string)=>{
    return assignmentModel.findOneAndUpdate({
        _id:assignmentId
    },{
        $set:{
            status:'completed'
        }
    })
    .then(result=>{
        return result;
    })
    .catch(err=>{
        console.log(err)
        throw err;
    })
}