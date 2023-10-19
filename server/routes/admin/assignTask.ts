import { NextFunction, Request, Response } from "express";
import { assignTask } from "../../models/dbFunctions/dbAssignment";
import { IRequestCheckAuth } from "../middleware/checkAuth";

export const assignTasktoStudent=(req:IRequestCheckAuth,res:Response,next:NextFunction)=>{
    const {task,dueDate}=req.body
    const {userId}=req.authData
    if(!userId) throw 'Not Valid User'
    assignTask(task,userId,dueDate)
    .then(result=>{
        console.log(result)
        res.send({status:true,msg:result})
    })
    .catch(err=>{
        console.log(err)
        res.send({status:false,error:err})
    })
}