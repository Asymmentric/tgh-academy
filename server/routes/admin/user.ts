import { Request, Response } from "express";
import { addNewUser, signInUser } from "../../models/dbFunctions/dbUser";

export const authSignIn=(req:Request,res:Response)=>{
    const {email,password}=req.body;

    signInUser(email,password)
    .then(result=>{
        console.log(result);
        res.send({status:true,data:result})
    })
    .catch(err=>{
        res.send({status:false,msg:err})
    })
    
}

export const addNewStudent=(req:Request,res:Response)=>{
    const {studentName,email,department,password}=req.body

    addNewUser(studentName,email,department,password)
    .then(result=>{
        console.log(result)
        res.send({status:true,data:result})
    })
    .catch(err=>{
        res.send({status:false,msg:err})
    })
}

