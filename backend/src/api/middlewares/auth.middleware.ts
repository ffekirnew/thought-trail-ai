import config from "../core/app.config";
import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  const token = header?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "No authentication token provided." });
  }

  try {
    const decoded = jwt.verify(token, config.jwt.secret);
    const { userId, username } = decoded;
    req.body.userId = userId;
    req.body.username = username;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid authentication token." });
  }
};

export default authMiddleware;
