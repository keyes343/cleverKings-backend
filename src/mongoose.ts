import mongoose, {Schema, model, Model, Document} from 'mongoose';
import { Router } from 'express';
import {RouterUser,SchemaUser,
RouterRoom,SchemaRoom} from './Models/index';
import * as t from './types/allTypes';

export class MongooseDatabase {
    db:typeof mongoose;
    SchemaUser: Schema;
    SchemaRoom: Schema; 

    ModelUser: Model<t.User>; 
    ModelRoom: Model<t.Room>;

    RouterUser: RouterUser;
    RouterUser_extractedRouter: Router; 
    RouterRoom: RouterRoom;
    RouterRoom_extractedRouter: Router;

    constructor(){
        this.db = mongoose;
        this.SchemaUser = SchemaUser; 
        this.SchemaRoom = SchemaRoom;
        
        this.ModelUser = model('user',this.SchemaUser);
        this.RouterUser = new RouterUser(this.ModelUser);
        this.RouterUser_extractedRouter = this.RouterUser.router; 

        this.ModelRoom = model('room',this.SchemaRoom);
        this.RouterRoom = new RouterRoom(this.ModelRoom);
        this.RouterRoom_extractedRouter = this.RouterRoom.router;

        this.initializeMongoose();
    }
    public initializeMongoose = async() => {
        const uri_auth = 'mongodb+srv://jeet343:jeet419@cluster0.vh99l.mongodb.net/cleverKings?retryWrites=true&w=majority';
        try {
            await this.db.connect(uri_auth, {useNewUrlParser:true, useUnifiedTopology: true, useFindAndModify: false});
            console.log('beep beep'); 

        } catch (error) {
            console.log(error)
        }
    }
    private func_2 =()=> {
        //this.User = model('user',this.SchemaUser);
        console.log('connected')
    }
}

// export const mongooseInstance = new MongooseDatabase();
// export const db = mongooseInstance.db;
// export const User = mongooseInstance.User;