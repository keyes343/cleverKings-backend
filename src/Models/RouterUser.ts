import express, { Router, Request, Response, NextFunction } from 'express';
import mongoose, {Schema, model, Model, Document} from 'mongoose';
import * as t from '../types/allTypes';

export class RouterUser {
    ModelUser: Model<t.User>
    router:Router;
    constructor(ModelUser:Model<t.User>){
        this.ModelUser = ModelUser;
        this.router = Router();
        this.initialize();
    }

    private initialize = () => {
        this.router.get('/get-list',async(req:Request, res: Response)=>{
            const body = req.body;
            try {
                
            } catch (error) {
                console.log({error})
            }
        })
        this.router.post('/acknowledge', async(req:Request, res:Response)=>{
            const {body:{email}}:{body:{email:string}} = req; 
            if(!email) return;
            try {
                // if user's phone details are received
                console.log('acknowledging--------');
                const found = await this.ModelUser.findOne({email}).lean();
                if (found){
                    console.log('found--------')
                    console.log({found})
                    res.status(200).send({
                        msg:'exists',
                        doc:found
                    })
                }else{
                // if user's phone google auth is received
                console.log('creating--------')
                    const created = await this.ModelUser.create({email});
                    if(created){
                        res.status(200).send({
                            msg:'created',
                            doc:created
                        })
                    }else{
                        res.status(200).send({
                            msg:'failed'
                        })
                    }
                }

            } catch (error) {
                console.log({error})
            }            
        })
    }
}
