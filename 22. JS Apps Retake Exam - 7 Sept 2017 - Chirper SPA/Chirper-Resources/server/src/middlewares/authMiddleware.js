import jwt from "jsonwebtoken";

import {SUPER_SECRET, COOKIE_NAME} from "../util/envConstats.js";
// middlewares/authMiddleware.js
import User from "../models/User.js";

export async function auth(req, res, next) {
    try {
        const token = req.headers['x-authorization'];

        // Ако няма header → гост
        if (!token) {
            req.user = null;
            return next();
        }

        // Търсим user по userId
        const user = await User.findOne({userId: token}).lean();

        if (!user) return res.status(401).json({message: "Invalid authorization token"});

        req.user = {
            id: user.userId,
            username: user.username
        };

        next();
    } catch (err) {
        console.error("Auth error:", err);
        return res.status(500).json({message: "Authentication failed"});
    }
}

// export const auth = (req, res, next) => {
//     const token = req.cookies[COOKIE_NAME];
//     if (!token) return next();
//
//     try {
//         const decoded = jwt.verify(token, SUPER_SECRET);
//         req.user = decoded;
//         res.locals.user = decoded;
//         return next();
//     } catch (err) {
//         res.clearCookie(COOKIE_NAME);
//         delete req.user;
//         delete res.locals.user;
//         return res.redirect("/login");
//     }
// };

export const isUser = (req, res, next) => {
    if (req.user) return next();
    return res.redirect("/login");
};

export const isGuest = (req, res, next) => {
    if (req.user) return res.redirect("/");
    return next();
};

export function isAuth(req, res, next) {
    // if (!req.session.user) return res.status(401).json({message: "Not authenticated"});
    if (!req.user) return res.status(401).json({message: "Not authenticated"});
    next();
}

export function isNotAuth(req, res, next) {
    // if (req.session.user) return res.status(401).json({message: "Not authenticated"});
    if (req.user) return res.status(401).json({message: "Not authenticated"});
    next();
}