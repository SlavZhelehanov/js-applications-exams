import {Router} from "express";

import {parseErrorMessage} from "../util/parseErrorMessage.js";
import comments from "../../import-json/comments.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";

const homeController = Router();

// HOME
homeController.get("/", async (req, res) => {
    try {
        for (const comment of comments) {
            const user = await User.findOne({username: comment.author}).lean();

            const newUser = await Comment.create({
                commentId: comment._id,
                postId: comment.postId,
                author: comment.author,
                content: comment.content,
                creator: user.userId,
                createdAt: comment._kmd.ect,
            })
            console.log(newUser);
        }

        return res.status(200).json({message: "Welcome to the API"});
    } catch (error) {
        return res.status(500).json({messages: parseErrorMessage(error)});
    }
});

export default homeController;