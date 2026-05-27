import session from 'express-session';
import cms from 'connect-mongodb-session';
import {DB_URI, SUPER_SECRET} from "../util/envConstats.js";

const MongoDBStore = cms(session);
const store = new MongoDBStore({uri: DB_URI, collection: 'sessions'});
const isProd = process.env.NODE_ENV === 'production';

store.on('error', (error) => console.log(error));

export default session({
    secret: SUPER_SECRET,
    resave: false,
    saveUninitialized: false,
    store,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        // secure: isProd, // true for https (production)
        // sameSite: isProd ? 'lax' : 'none',// none ЗАДЪЛЖИТЕЛНО за cross-origin, иначе 'strict',
        secure: false,
        sameSite: 'none',// none ЗАДЪЛЖИТЕЛНО за cross-origin, иначе 'strict',
    },
});