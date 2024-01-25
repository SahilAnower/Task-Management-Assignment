import { CustomError } from "../models/CustomError.js";
import jwt from "jsonwebtoken";

export const authenticate = async (req, res, next) => {
  try {
    const tokenHeader =
      req.headers.authorization || req.headers.Authorization || req.token;
    if (!tokenHeader) {
      throw new CustomError("Authorization header must be provided", 401);
    }
    const token = tokenHeader.split(" ")[1];
    if (!token) {
      throw new CustomError("Authorization token must be provided", 401);
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = decodedToken?.userId;
    next();
  } catch (error) {
    next(error);
  }
};
