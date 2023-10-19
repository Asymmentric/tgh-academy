import { NextFunction, Request, Response } from "express";
import { IRequestCheckAuth } from "./checkAuth";

export const isAdmin = (req: IRequestCheckAuth, res: Response, next: NextFunction) => {
    try {
        if (req.authData.userType !== 'admin') {
            throw `Not Authorised`
        }
        next()
    } catch (err) {
        console.log(err)
        res.send({ status: false, errors: err })
    }
}