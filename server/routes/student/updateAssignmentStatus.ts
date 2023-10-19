import { Request, Response } from "express";
import { updateAssignmentToComplete } from "../../models/dbFunctions/dbAssignment";
import { IRequestCheckAuth } from "../middleware/checkAuth";

export const updateAssignmentStatus=(req:IRequestCheckAuth,res:Response)=>{
    const {id}=req.params;
    const {userId}=req.authData
    if(!userId) throw 'Invalid User'
    updateAssignmentToComplete(userId,id)
    .then(result=>{
        console.log(result)
        res.send({status:true,msg:"Completed"})
    })
}