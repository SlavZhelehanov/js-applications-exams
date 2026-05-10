import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import {dbConnection} from "./util/dbConnection.js";
import {parseErrorMessage} from "./util/parseErrorMessage.js";
import session from "./middlewares/session.js";
import {PORT} from "./util/envConstats.js";
import {auth} from "./middlewares/authMiddleware.js";
import routes from "./routes.js";

// Define __dirname
import {dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import logger from "./middlewares/logger.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Establishing a database connection
try {
    await dbConnection();
} catch (error) {
    console.log(parseErrorMessage(error));
}

const app = express();

// Add middlewares
// app.set('trust proxy', 1); // важно при Nginx/HTTPS
app.use(logger);
app.use(cors(
    {
        origin: ["http://localhost:5500", "http://127.0.0.1:5500"],
        credentials: true,
    }
));
app.use(cookieParser());
app.use(session);
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static("src/public"));
app.use(auth);
app.use(routes);

app.listen(PORT, console.log(`Server is listening on: http://localhost:${PORT}...`));