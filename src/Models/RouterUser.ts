import express, { Router, Request, Response, NextFunction } from 'express';
import mongoose, {Schema, model, Model, Document} from 'mongoose';
import * as t from '../types/allTypes';

export class RouterUser {
    ModelUser: Model<t.User>
    router:Router;
    constructor(ModelUser:Model<t.User>){
        this.ModelUser = ModelUser;
        this.router = Router();
    }

    private initialize = () => {
        this.router.get('/get-list',async(req:Request, res: Response)=>{
            const body = req.body;
            try {
                
            } catch (error) {
                console.log({error})
            }
        })
    }
}
