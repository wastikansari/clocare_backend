import Joi from "joi";
import StaffLoginModel from "../../../models/staff/staff_login";
import JwtService from "../../../service/JwtService";
import { JWT_STAFF_SECRET } from "../../../config/index";
import bcrypt from "bcrypt";

const StaffController = {
  async register(req, res, next) {
    // Validation
    const registerSchema = Joi.object({
      name: Joi.string().required(),
      mobile: Joi.number().required(),
      role: Joi.string().required(),
      password: Joi.string().required(),
    });
    const { error } = registerSchema.validate(req.body);
    if (error) {
      res.json({ status: false, data: { error } });
    } else {
      // check if user is in the database already
      try {
        const existPhone = await StaffLoginModel.exists({
          mobile: req.body.mobile,
        });
        if (existPhone) {
          res.status(200).json({
            status: false,
            data: {
              msg: "This mobile number has already been registered by a staff member..",
            },
          });
        }
      } catch (err) {
        return next(err);
      }
    }
    const { name, mobile, role, password } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const staff = new StaffLoginModel({
      name,
      mobile,
      role,
      password: hashedPassword,
    });

    try {
      await staff.save();
      const access_token = JwtService.sign(
        { _id: staff._id },
        "1y",
        JWT_STAFF_SECRET
      );

      staff.access_token = access_token;
      await staff.save();
    } catch (err) {
      return next(err);
    }
    res.status(200).json({ status: true, data: staff });
  },

  async login(req, res, next) {
    // Validation
    const loginSchema = Joi.object({
      username: Joi.number().required(),
      password: Joi.string().required(),
    });
    const { error } = loginSchema.validate(req.body);

    if (error) {
      res.json({ status: false, data: { msg: error } });
    }
    const { username, password } = req.body;

    try {
      const user = await StaffLoginModel.findOne({ mobile: username });
      if (!user) {
        return res.json({
          status: false,
          data: { msg: "Mobile number is wrong!" },
        });
      }
      // compare the password
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.json({ status: false, data: { msg: "Password is wrong!" } });
      }
      res.json({ status: true, data: user });
    } catch (err) {
      return next(err);
    }
  },
};

export default StaffController;
