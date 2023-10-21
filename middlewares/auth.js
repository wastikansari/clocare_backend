import CustomErrorHandler from "../service/CustomErrorHandler";
import JwtService from "../service/JwtService";
import {  JWT_SECRET } from "../config/index";

const auth = async (req, res, next) => {
  let authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(CustomErrorHandler.unAuthorized());
  }

  const token = authHeader.split(" ")[1];

  try {
    const { _id } = JwtService.verify(token, JWT_SECRET);
    const user = {
      _id,
    };
    req.user = user;
    next();
  } catch (err) {
    return next(CustomErrorHandler.unAuthorized());
  }
};

export default [auth];
