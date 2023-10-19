import { Request,Response,NextFunction } from "express";

export class ErrorHandlers {
    public JSONSyntaxErrorHandler (error:any,req:Request,res:Response,next:NextFunction){
        if(error instanceof SyntaxError && 'body' in error){
            console.log(error)
            res.status(400).send({
                status:false,
                error:{
                    message:error.message,
                }
            })
        }else next()

    }

    public routeNotFoundHandler(req:Request,res:Response) : void {
        res.status(404).send({status:'Not Found'})
    }
}