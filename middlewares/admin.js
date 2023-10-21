import StaffLogin from "../models/staff/staff_login";
import CustomErrorHandler from "../service/CustomErrorHandler";
import JwtService from "../service/JwtService";
import { JWT_STAFF_SECRET } from "../config";

const adminAuth = async (req, res, next) => {
  let authHeader = req.headers.authorization;
  console.log(`admin auth ${authHeader}`);
  if (!authHeader) {
    return next(CustomErrorHandler.unAuthorized());
  }

  const token = authHeader.split(" ")[1];
  try {
    const { _id } = JwtService.verify(token, JWT_STAFF_SECRET);
    const user = {
      _id,
    };
    req.user = user;
    next();
  } catch (err) {
    return next(CustomErrorHandler.unAuthorized());
  }
};

const admin = async (req, res, next) => {
    console.log(`admin call ${req.user._id}`);
    try {
        const user = await StaffLogin.findOne({ _id: req.user._id });
        if (user.role === 'admin') {
            next();
        } else {
            return next(CustomErrorHandler.unAuthorized());
        }
    } catch (err) {
        return next(CustomErrorHandler.serverError(err.message));
    }
};

export { adminAuth,  admin};
