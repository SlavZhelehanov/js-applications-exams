import {Router} from "express";

import {parseErrorMessage} from "../util/parseErrorMessage.js";
import users from "../../import-json/users.js";
import User from "../models/User.js";

const homeController = Router();

// HOME
homeController.get("/", async (req, res) => {
    try {
        for (const user of users) {
            const newUser = await User.create({
                username: user.username,
                userId: user._id,
                password: "123456",
                createdAt: user._kmd.ect,
            })
            console.log(newUser);
        }

        return res.status(200).json({message: "Welcome to the API"});
    } catch (error) {
        return res.status(500).json({messages: parseErrorMessage(error)});
    }
});

export default homeController;