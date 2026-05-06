import {Router} from "express";

import {parseErrorMessage} from "../util/parseErrorMessage.js";
import usersSeed from "./users.js";
import Chirp from "../models/Chirp.js";
import chirpsSeed from "./chirps.js";

const homeController = Router();

// HOME
homeController.get("/", async (req, res) => {
    try {
        for (let i = 0; i < chirpsSeed.length; i++) {
            const {username} = usersSeed.find(u => u._id === chirpsSeed[i]._acl.creator);
            const chirp = await Chirp.create({
                text: chirpsSeed[i].text,
                author: username,
                creator: chirpsSeed[i]._acl.creator,
            });
            console.log(chirp);
        }
        return res.status(200).json({message: "Welcome to the API"});
    } catch (error) {
        return res.status(500).json({messages: parseErrorMessage(error)});
    }
});

export default homeController;