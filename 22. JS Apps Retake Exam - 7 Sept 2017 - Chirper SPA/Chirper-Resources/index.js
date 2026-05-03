import express from 'express';
import cookieParser from 'cookie-parser';
import { dbConnection } from './utils/dbConnection.js';
import routes from './routes.js';

try {
    await dbConnection();
} catch (dbError) {
    console.error(dbError);
}

const app = express();
const PORT = process.env.PORT || 3030;

app.use(express.static('public'));
app.use(cookieParser());
app.use(routes);

app.listen(PORT, console.log(`App listening on http://localhost:${PORT}`));