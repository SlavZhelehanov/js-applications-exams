import mongoose from "mongoose";

const DB_URL = 'mongodb://127.0.0.1:27017/application_exams'

export async function dbConnection(params) {
    mongoose.connection.on('connected', () => console.log('connected'));
    mongoose.connection.on('open', () => console.log('open'));
    mongoose.connection.on('disconnected', () => console.log('disconnected'));
    mongoose.connection.on('reconnected', () => console.log('reconnected'));
    mongoose.connection.on('disconnecting', () => console.log('disconnecting'));
    mongoose.connection.on('close', () => console.log('close'));

    return mongoose.connect(DB_URL);
}