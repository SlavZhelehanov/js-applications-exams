import { Router } from "express";
import homeRouter from "./routes/homeRouther.js";

const routes = Router();

routes.use('/', homeRouter);

export default routes;