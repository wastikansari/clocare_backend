import Joi from "joi";
import CustomerLoginModel from "../../../models/customer/customer_login";
import JwtService from "../../../service/JwtService";
import {  JWT_SECRET } from "../../../config/index";

const registerController = {
  async register(req, res, next) {
    // Validation
    const registerSchema = Joi.object({
      name: Joi.string().required(),
      mobile: Joi.number().required(),
    });
    const { error } = registerSchema.validate(req.body);
    if (error) {
      res.json({ status: false, data: { error } });
    } else {
      // check if user is in the database already
      try {
        const existPhone = await CustomerLoginModel.exists({
          mobile: req.body.mobile,
        });
        if (existPhone) {
          res.status(200).json({
            status: false,
            data: { msg: "This mobile number is already taken." },
          });
        }
      } catch (err) {
        return next(err);
      }
    }

    const { name, mobile } = req.body;

    const customerLogin = new CustomerLoginModel({ name, mobile });

    try {
      await customerLogin.save();
      const access_token = JwtService.sign(
        { _id: customerLogin._id },
        "1y",
        JWT_SECRET
      );

      customerLogin.access_token = access_token;
      await customerLogin.save();
    } catch (err) {
      return next(err);
    }
    // res.status(200).json({ status: true, data: { userLoginResult,  token:  access_token } });
    res.json({ status: true, data: customerLogin });
  },
};

export default registerController;
