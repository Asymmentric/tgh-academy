import { NextFunction, Request, Response } from "express";
import { fetchAssignments } from "../../models/dbFunctions/dbAssignment";
import { IRequestCheckAuth } from "../middleware/checkAuth";

export const getAssignments=(req:IRequestCheckAuth,res:Response)=>{
    const {userId}=req.authData
    if(!userId) throw 'Invalid User'
    fetchAssignments(userId)
    .then(result=>{
        res.send({status:true,data:result})
    })
    .catch(err=>{
        console.log(err)
        res.send({status:false,error:err})
    })
}