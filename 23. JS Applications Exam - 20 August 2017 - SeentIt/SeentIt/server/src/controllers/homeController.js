import {Router} from "express";

// import {parseErrorMessage} from "../util/parseErrorMessage.js";

const homeController = Router();

// HOME
homeController.get("/", async (req, res) => {
    return res.status(200).json({message: "Welcome to the API"});
});

export default homeController;