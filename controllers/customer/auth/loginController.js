  import Joi from "joi";
import CustomerLoginModel from "../../../models/customer/customer_login";

const loginController = {
  async login(req, res, next) {
    // Validation
    const loginSchema = Joi.object({
      mobile: Joi.number().required(),
    });
    const { error } = loginSchema.validate(req.body);

    if (error) {
      res.json({ status: false, data: { msg: error } });
    }

    try {
      const user = await CustomerLoginModel.findOne({
        mobile: req.body.mobile,
      });
      if (!user) {
        res.json({ status: false, data: { msg: "Mobile number is wrong!" } });
      }

      res.json({ status: true, data: user });
    } catch (err) {
      return next(err);
    }
  },
};

export default loginController;
