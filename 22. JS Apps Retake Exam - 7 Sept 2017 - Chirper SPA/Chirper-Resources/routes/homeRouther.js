import { Router } from 'express';

const homeRouter = Router();

homeRouter.get('/', (req, res) => {
    return res.status(200).json({ message: 'Hello from the app' });
});

export default homeRouter;