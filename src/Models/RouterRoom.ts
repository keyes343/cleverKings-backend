import express, { Router, Request, Response, NextFunction } from 'express';
import mongoose, {Schema, model, Model, Document} from 'mongoose';
import * as t from '../types/allTypes';

export class RouterRoom {
    ModelRoom: Model<t.Room>
    router:Router;
    constructor(ModelRoom:Model<t.Room>){
        this.ModelRoom = ModelRoom;
        this.router = Router();
        this.initialize();
    }

    private initialize = () => {
        this.router.get('/get-list',async(req:Request, res: Response)=>{
            const body = req.body;
            console.log('node capture done')
            try {
                const docsFound = await this.ModelRoom.find().lean();
                if(docsFound){
                    res.status(200).send({
                        msg:'docs found',
                        docs:docsFound
                    })
                }else res.status(200).send({
                    msg:'no docs found',
                    docs:false
                })
            } catch (error) {
                console.log({error})
            }
        })
        this.router.post('/toggle-room',async(req:Request,res:Response)=>{
            const {name}:{
                name:number, // room number as name
            } = req.body;
            try {
                console.log('toggle room working');
                console.log({name})
                 const found = await this.ModelRoom.findOne({name});
                 if(found){
                     // check the availability of this room
                     const availability = found.availability;
                     console.log({availability})
                     found.availability = !availability;

                     if(availability){
                         found.userEmail = ''
                     }
                     await found.save();
                     res.status(200).send({
                        msg: availability?'deleted':'added',
                        doc:found
                     })
                 }else{
                    //  const created = await this.ModelRoom.create({
                    //      name: Math.floor(Math.random())*10000
                    //  });
                    //  if(created){
                    //      res.status(200).send({
                    //          msg:'created',
                    //          doc:created
                    //      })
                    //  }
                 }
            } catch (error) {
                console.log({error})
            }
        })
        this.router.get('/add-room',async(req:Request, res: Response)=>{
            console.log('-------yessssssss')
             try {
                 const created = await this.ModelRoom.create({
                    name: Math.floor(Math.random()*10000),
                    availability: false
                });
                if(created){
                    console.log('created');
                    console.log({created})
                    res.status(200).send({
                        msg:'created',
                        doc:created
                    })
                }
             } catch (error) {
                 console.log({error})
             }
        });
        this.router.post('/delete-room',async(req:Request, res: Response)=>{
            const {name}:{name:number}  = req.body;
            try {
                 const found = await this.ModelRoom.findOne({
                    name
                });
                if(found){
                    found.delete();    
                    res.status(200).send({
                        msg:'deleted'
                    })
                }
             } catch (error) {
                 console.log({error})
             }
        });
        this.router.post('/check-self-availability',async(req:Request, res: Response)=>{
            const {name,email}:{name:number,email:string} = req.body
            try {
                const found = await this.ModelRoom.findOne({name});
                if(found){
                    const userExists = found.userEmail === email;
                    res.status(200).send({
                        msg:'checked and returning value',
                        booked: userExists
                    })
                }
            } catch (error) {
                console.log({error})
            }
        })
        this.router.post('/book-now',async(req:Request,res:Response)=>{
            const {email,name}: {email:string,name:number} = req.body;

            try {
                const grabbed = await this.ModelRoom.findOne({name});
                if(grabbed){
                    grabbed.userEmail = email;
                    await grabbed.save();
                    res.status(200).send({
                        msg:'added',
                        doc:grabbed
                    })
                }

            } catch (error) {
                console.log({error})
            }
        })
        this.router.post('/unbook',async(req:Request,res:Response)=>{
            const {email,name}: {email:string,name:number} = req.body;

            try {
                const grabbed = await this.ModelRoom.findOne({name});
                if(grabbed){
                   grabbed.userEmail = '';
                   grabbed.availability = true;
                    await grabbed.save();
                    res.status(200).send({
                        msg:'deleted',
                        doc:grabbed
                    })
                }

            } catch (error) {
                console.log({error})
            }
        })
    }
}
