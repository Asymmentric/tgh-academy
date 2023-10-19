import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import dotenv from "dotenv"
import { ObjectId } from "mongoose";

const jwtsecret = process.env.JWT_SECRET

export interface IAuthData {
    isAuth: boolean,
    userType: string | null,
    userId: ObjectId | null
}

export interface IRequestCheckAuth extends Request, IAuthData{
    authData: IAuthData
}

export const checkAuth = (req: IRequestCheckAuth, res: Response, next: NextFunction) => {
    
    try {
        let authData: IAuthData = {
            isAuth: false,
            userType: null,
            userId: null
        }
        if (!req.headers.authorization) {
            throw `Token Not Found`
        }
        const token = req.headers.authorization.split(" ")[1]

        if (!token) throw 'Not valid Token'

        const decodedData: any = verify(token, jwtsecret as string, (err, decoded) => {
            if (err) {
                console.log(err)
                throw 'Not valid token'
            }
            console.log(decoded)
            return decoded
        })
        authData = {
            isAuth: true,
            userType: decodedData.userType,
            userId: decodedData.userId
        }

        req.authData = authData
        next()

    } catch (error) {
        console.log(error)
        res.send({ status: false, errors: error })
    }
}