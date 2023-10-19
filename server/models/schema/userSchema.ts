import mongoose, { Schema, model } from "mongoose";

export interface IUser {
    name: string,
    email: string,
    password: string,
    department: string,
    userType: string
}

const userSchema: Schema = new mongoose.Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    department: { type: String, required: true },
    userType: { type: String, required: true, enum:['admin','student']},
    password: { type: String, required: true }
})

export const userModel = mongoose.model('users', userSchema)
