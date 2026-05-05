import {Router} from 'express';

const homeRouter = Router();

homeRouter.get('/', (req, res) => {
    return res.send('Hello World!');
});

export default homeRouter;