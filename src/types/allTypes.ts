import mongoose, { Schema, Document } from 'mongoose';
export type room = {
    name: number;
    availability: boolean;
}; 

export interface User extends Document {
    googleId: {type:String, required:true};
    roomsBooked: {type:Array<String>,required:false,default:[]};
}
export interface Room extends Document {
    name: number;
    availability: boolean;
    userEmails: string[] // doc ids of users
}
