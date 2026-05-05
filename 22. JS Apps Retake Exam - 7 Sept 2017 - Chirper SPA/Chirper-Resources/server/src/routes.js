import {Router} from 'express';
import homeRouter from './routes/homeRouter.js';

export const routes = Router();

routes.use('/', homeRouter);

export default routes;