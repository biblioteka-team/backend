import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";
import AppErrors from "../constants/errors.js";

const authGuard = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .json({ status: false, message: AppErrors.tokenRequired });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ status: false, message: AppErrors.tokenRequired });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ status: false, message: AppErrors.tokenVerificationFailed });
  }
};

export default authGuard;
