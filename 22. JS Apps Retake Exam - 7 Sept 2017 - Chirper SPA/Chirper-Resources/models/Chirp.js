import { Schema, model } from "mongoose";

const ChirpSchema = new Schema({
    text: {
        type: String,
        required: [true, 'Text is required'],
        trim: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

export default model('Chirp', ChirpSchema);