import cookieParser from 'cookie-parser'
import express, { Request, Response, NextFunction } from 'express'
import { ErrorHandlers } from './utils/invalidJSONSyntaxHandler'
import { router } from './routes/routes'
import { connect } from './models/dbConn'

export class App {
    public app: express.Application

    private errorHandler: ErrorHandlers = new ErrorHandlers()

    constructor(port:any) {
        this.app = express()
        this.config()
        this.routes()
        this.app.use('*',this.errorHandler.routeNotFoundHandler)
        this.connectToDb()
        this.startServer(port)

    }

    private async connectToDb(){
        await connect()
    }

    private config() {
        this.app.use(express.json())
        this.app.use(express.urlencoded())
        this.app.use(cookieParser())
        this.app.use(this.errorHandler.JSONSyntaxErrorHandler)
    }

    private routes() {
        router(this.app)
    }

    public startServer(port:number) {
        this.app.listen(port,()=>{
            console.log(`Server running at ${port}`)
        })
    }
    
}