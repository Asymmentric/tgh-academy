import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config()

const dbConnUrl =process.env.DB_URL
const dbName =process.env.DB_NAME

export const connect=async ():Promise<void>=>{
    try {
        await mongoose.connect(dbConnUrl as string,{
            dbName,
            autoIndex:true
        })
        console.log('Db Connected')
    } catch (error) {
        console.log(error)
        console.log(`- - - - - - DB connection Failed - - - - - - -`)
        
    }
}
