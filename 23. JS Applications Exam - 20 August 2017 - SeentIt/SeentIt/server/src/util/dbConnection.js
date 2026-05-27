import mongoose from "mongoose";

import {DB_URI} from "./envConstats.js";

export const dbConnection = () => {
    mongoose.connection.on('connected', () => console.log('DB is connected'));
    mongoose.connection.on('open', () => console.log('DB connection is open'));
    mongoose.connection.on('disconnected', () => console.log('DB is disconnected'));
    mongoose.connection.on('reconnected', () => console.log('DB is reconnected'));
    mongoose.connection.on('disconnecting', () => console.log('DB is disconnecting'));
    mongoose.connection.on('close', () => console.log('DB connection is close'));

    return mongoose.connect(DB_URI);
};