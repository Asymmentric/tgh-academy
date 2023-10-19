import { sign } from "jsonwebtoken"
import { IUser, userModel } from "../schema/userSchema"
import bcrypt, { hash } from "bcrypt"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
dotenv.config()

const jwtSecret=process.env.JWT_SECRET

interface signInUser extends IUser{
    accessToken:string
}

export interface IReturnUserLoginData{
    name:string,
    email:string,
    userType:string
}

export const signInUser=(email:string,password:string) =>{
    let data:IReturnUserLoginData
    return userModel.findOne({email})
    .then(userEmail=>{
        if(!userEmail) throw 'Email not registered'
        const {name,email,created_at,userType}=userEmail;
        data={name,email,userType}
        return bcrypt.compare(password,userEmail.password)
    })
    .then(passwordCorrect=>{
        if(!passwordCorrect) throw "Incorrect Password"
        return jwt.sign(data,jwtSecret as string,{
            expiresIn:'7d'
        })
    })
    .then(token=>{
        if(!token) throw 'Can not login. Try again'
        return {data,access_token:token}
    })
    .catch(err=>{
        console.log(err)
        throw err
    })

}

export const addNewUser=(student:string,email:string,dept:string,password:string)=>{
    return userModel.findOne({email})
    .then(alreadyExists=>{
        if(alreadyExists) throw `Student with email ${email} already exists`
        return hash(password,12)
    })
    .then(hashedPassword=>{
        const newStudent =new userModel({
            name:student,
            email,
            department:dept,
            password:hashedPassword
        })

        return newStudent.save();
    })
    .then(createdUser=>{
        const {name,email,userType}=createdUser;
        return {name,email,userType}
    })
    .catch(err=>{
        console.log(err)
        throw err
    })
}