import CustomerLoginModel from "../../models/customer/customer_login";
import Address from "../../models/customer/customer_address";
import CustomerAddress from "../../models/customer/customer_address";
import Joi from "joi";
const profileController = {
  async update(req, res, next) {
    const { name, email_id, gender, dob } = req.body;

    const customerId = req.user._id;
    try {
      const user = await CustomerLoginModel.findOne({ _id: customerId });
      if (!user) {
        res.json({ status: false, data: { msg: "customer not register!" } });
      }

      user.name = name;
      user.email = email_id;
      user.gender = gender;
      user.dob = dob;
      await user.save();
      res.json({ status: true, data: "profile update successfully" });
    } catch (err) {
      return next(err);
    }
  },
  async profile(req, res, next) {
    const customerId = req.user._id;
    console.log(`wwwwwwwwwwwww ${customerId}`);
    try {
      const user = await CustomerLoginModel.findOne({ _id: customerId });
      console.log(`wwwwwwwwwwwww ${customerId} and ${user}`);
      if (!user) {
        res.json({ status: false, data: { msg: "customer not register!" } });
      }

      res.json({ status: true, data: user });
    } catch (err) {
      return next(err);
    }
  },

  async emailUpdate(req, res, next) {
    const emailSchema = Joi.object({
      email_id: Joi.string().required(),
    });

    const { error } = emailSchema.validate(req.body);

    if (error) {
      res.json({ status: false, data: { msg: error } });
    }

    const { email_id } = req.body;
    const customerId = req.user._id;

    try {
      const user = await CustomerLoginModel.findOne({ _id: customerId });
      if (!user) {
        res.json({ status: false, data: { msg: "customer not register!" } });
      }

      user.email = email_id;
      await user.save();

      res.json({ status: true, data: "profile email update successfully" });
    } catch (err) {
      return next(err);
    }
  },
};

export default profileController;
