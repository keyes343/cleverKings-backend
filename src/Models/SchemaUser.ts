import mongoose, { Schema, Document } from 'mongoose';
import * as t from '../types/allTypes';

export const SchemaUser = new Schema({
    email: { type: String, required: true },
    roomsBooked: { type: [Number], required: false, default:[] },
},{timestamps:true});
