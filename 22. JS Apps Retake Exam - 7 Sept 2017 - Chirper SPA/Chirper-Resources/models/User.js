import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        trim: true,
        unique: [true, 'This username is already taken']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true
    },
    following: [],
    followers: []
}, { timestamps: true });

export default model('User', UserSchema);