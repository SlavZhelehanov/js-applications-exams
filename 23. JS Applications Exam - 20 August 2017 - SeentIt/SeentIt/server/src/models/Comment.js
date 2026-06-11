import {Schema, model} from "mongoose";
import {v4 as uuid} from "uuid";

const commentSchema = new Schema({
    commentId: {
        type: String,
        default: uuid,
    },
    postId: {
        type: String,
        required: [true, "Title field can't be empty"],
    },
    author: {
        type: String,
        required: [true, "The author field can't be empty"],
    },
    content: {
        type: String,
        required: [true, "Content field can't be empty"],
        minLength: [1, "The content should be at least 10 characters long"],
        // maxLength: [100, "The description should be max 100 characters long"]
    },
    creator: {
        // type: Schema.Types.ObjectId,
        // ref: "User"
        type: String,
        required: [true, "The creator field can't be empty"],
    }
}, {timestamps: true});

export default model("Comment", commentSchema);