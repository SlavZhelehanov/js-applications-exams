import {Router} from "express";

import homeController from "./controllers/homeController.js";

const routes = Router();

routes.use("/", homeController);

routes.all(/\*/, (req, res) => {
    return res.status(404).json({message: "Page Not Found"});
});

export default routes;