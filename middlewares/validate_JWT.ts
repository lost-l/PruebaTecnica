import * as jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";
import { myRequest } from "../helpers/myTypes";

export const validateJwt = async (req: myRequest, res: Response, next: NextFunction) => {
    const token = req.header("token");
    if (!token) return res.status(401).json({
        err: "Login is neccesary"
    })

    try {
        const { uid } = jwt.verify(token, process.env.PRIVATE_KEY!) as jwt.Tokenn;
        req.uid = uid;
        next();
    } catch (error) {
        return res.status(401).json({
            err: "invalid token"
        })
    }
}