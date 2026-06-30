import jwt from "jsonwebtoken";

import {SUPER_SECRET} from "../util/envConstats.js";

export async function auth(req, res, next) {
    const token = req.headers['x-authorization'];

    if (!token) {
        req.user = null;
        return next();
    }

    try {
        req.user = jwt.verify(token, SUPER_SECRET);
        next();
    } catch (err) {
        req.user = null;
        return res.status(401).json({message: "Invalid token"});
    }
}

export const isUser = (req, res, next) => {
    if (req.user) return next();
    return res.redirect("/login");
};

export const isGuest = (req, res, next) => {
    if (req.user) return res.redirect("/");
    return next();
};

export function isAuth(req, res, next) {
    if (!req.user) return res.status(401).json({message: "Not authenticated"});
    next();
}

export function isNotAuth(req, res, next) {
    if (req.user) return res.status(401).json({message: "Not authenticated"});
    next();
}

export function createToken(user) {
    return jwt.sign({
        id: user.userId,
        username: user.username
    }, SUPER_SECRET, {expiresIn: "2h"});
}