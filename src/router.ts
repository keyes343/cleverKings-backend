import express, { Router, Request, Response, NextFunction } from 'express';
import mongoose, {Schema, model, Model, Document} from 'mongoose';
import app from './index'; 

import { MongooseDatabase } from './mongoose';   
export default router; // this will be used by the main express app for routing
///------------ 

class ExpressRouter{
    // MAIN ROUTER FOR THIS ENTIRE APP
    router: Router; 
    MongooseInstance: MongooseDatabase; db: any;
    // Sub-Routers
    RouterUser: Router; 
    RouterRoom: Router;
     
    constructor(){
        this.router = express.Router();
        this.MongooseInstance = new MongooseDatabase(); // initializing Main-Mongoose class
        this.db = this.MongooseInstance.db;

        // USER MODEL & ROUTER
        this.RouterUser = this.MongooseInstance.RouterUser_extractedRouter; // extracting the 'router' object from class
        this.RouterRoom = this.MongooseInstance.RouterRoom_extractedRouter;

        this.router.use('/users', this.RouterUser); // assigning path for router extension
        this.router.use('/rooms', this.RouterRoom);  
    }

     
}
const InitializeExpressRouter = new ExpressRouter(); // initializing the main class inside this file
export const router = InitializeExpressRouter.router; // this will be used by the main express app for routing
// export const User = InitializeExpressRouter.ModelUser;
// export const UserRouter = InitializeExpressRouter.UserRouter;
