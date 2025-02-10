import { NextFunction, Request, Response } from 'express';

export const getJwtFromRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {

    let authHeader = req.headers.authorization;
    
    if (!authHeader) {
        res.status(401).json({
            message: "Bearer Token is required." ,
        });
        return;
    }
    
    const parts = authHeader.trim().split(" ");

    const token = (parts.length === 2 && parts[0].toLowerCase() === "bearer")
    ? parts[1]
    : parts[0];

    req.token = token;
    next();
};
