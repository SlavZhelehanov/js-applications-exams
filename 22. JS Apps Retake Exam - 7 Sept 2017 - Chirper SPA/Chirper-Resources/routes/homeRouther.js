import { Router } from 'express';
import { __dirname } from '../__dirname.js';

const homeRouter = Router();

homeRouter.get('/', (req, res) => {
    return res.status(200).sendFile(__dirname + '/views/index.html');
});

export default homeRouter;