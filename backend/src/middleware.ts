import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";
export const userMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers["authorization"]?.split(" ")[1];
  if (header) {
    const decoded = jwt.verify(header, JWT_SECRET);
    if (decoded) {
      // @ts-ignore
      req.userId = decoded.id;
      next();
    } else {
      res.status(403).json({ message: "You are not logged in" });
    }
  } else {
    res.status(403).json({ message: "please send authorization" });
  }
};
