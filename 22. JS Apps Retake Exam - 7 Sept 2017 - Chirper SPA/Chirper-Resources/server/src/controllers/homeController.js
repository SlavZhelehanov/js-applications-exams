import {Router} from "express";

import {parseErrorMessage} from "../util/parseErrorMessage.js";
import User from "../models/User.js";
import usersSeed from "./users.js";

const homeController = Router();
const PASSWORD = "123456";

// HOME
homeController.get("/", async (req, res) => {
    try {
        for (let i = 0; i < usersSeed.length; i++) {
            const user = await User.create({
                username: usersSeed[i].username,
                // email: usersSeed[i].email,
                followers: usersSeed[i].subscriptions,
                userId: usersSeed[i]._id,
                password: PASSWORD,
            });
            console.log(user);
        }
        return res.status(200).json({message: "Welcome to the API"});
    } catch (error) {
        return res.status(500).json({messages: parseErrorMessage(error)});
    }
});

export default homeController;