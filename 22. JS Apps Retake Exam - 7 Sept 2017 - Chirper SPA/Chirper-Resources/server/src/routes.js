import {Router} from "express";

import homeController from "./controllers/homeController.js";
import auth from "./routes/auth.js";

const routes = Router();

routes.use("/", homeController);

routes.use('/auth', auth);

routes.all(/\*/, (req, res) => {
    return res.status(404).json({message: "Page Not Found"});
});

export default routes;