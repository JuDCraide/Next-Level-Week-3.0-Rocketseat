import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

const auth: RequestHandler = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send({ error: "No token provided" });
    }

    const [scheme, token] = authHeader.split(" ");

    try {
        await promisify(jwt.verify)(token, "secret");

        return next();
    } catch (err) {
        return res.status(401).send({ error: "Token invalid" });
    }
};

export default auth;