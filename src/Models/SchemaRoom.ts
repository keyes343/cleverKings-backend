import mongoose, { Schema, Document } from 'mongoose';
import * as t from '../types/allTypes';

export const SchemaRoom = new Schema({
    name: { type: Number, required: true },
    availability: { type: Boolean, required: false, default:false },
    userEmail: { type:String,required:false,default:'' }
},{timestamps:true}); 