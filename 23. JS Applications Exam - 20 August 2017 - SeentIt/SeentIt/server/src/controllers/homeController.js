import {Router} from "express";

import {parseErrorMessage} from "../util/parseErrorMessage.js";

const homeController = Router();

// HOME
homeController.get("/", async (req, res) => {
    try {
        
        return res.status(200).json({message: "Welcome to the API"});
    } catch (error) {
        return res.status(500).json({messages: parseErrorMessage(error)});
    }
});

export default homeController;