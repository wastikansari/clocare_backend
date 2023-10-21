import Joi from "joi";
import SuscriptionModel from "../../../models/subscription/subscription_model";

const SubscriptionController = {
  async create(req, res, next) {
    // Validation
    const subscriptionSchema = Joi.object({
      package_id: Joi.string().required(),
      address_id: Joi.string().required(),
      email: Joi.string().required(),
      payment_type: Joi.string().required(),
      payment_status: Joi.string().required(),
      amount: Joi.string().required(),
      transaction_id: Joi.string().required(),
      start_date: Joi.string().required(),
      end_date: Joi.string().required(),
      pickup_day: Joi.string().required(),
      pickup_slot: Joi.string().required(),
      delivery_type: Joi.string().required(),
    });

    const { error } = subscriptionSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    const {
      package_id,
      address_id,
      email,
      package_valid,
      package_prices,
      pickup_day,
      pickup_slot,
      amount_pay,
      payment_status,
      payment_type,
    } = req.body;
    const userId = req.user._id;
    try {
      const recentBuy = await SuscriptionModel.findOne({
        customer_id: userId,
        package_id: package_id,
        createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }, // 60 seconds
      });

      if (recentBuy) {
        return res.status(200).json({
          status: false,
          msg: `You have already buy this package, wait for 24 houre`,
        });
      } else {
        const subscription = new SuscriptionModel({
          customer_id: userId,
          package_id,
          address_id,
          email,
          package_valid,
          package_prices,
          pickup_day,
          pickup_slot,
          amount_pay,
          payment_status,
          payment_type,
        });

        const data = await subscription.save();
        res.status(200).json({ status: true, data: { data } });
      }
    } catch (err) {
      return next(err);
    }

    res.status(200).json({ status: true, data: { subscriptionSchema } });
  },

  //   async read(req, res, next) {
  //     const packageList = await packageModel.find();

  //     res.json({ status: true, data: packageList });
  //   },

  //   async update(req, res, next) {
  //     const packageSchema = Joi.object({
  //       // package_id: Joi.string().required(),
  //       package_name: Joi.string().required(),
  //       package_code: Joi.string().required(),
  //       prices: Joi.string().required(),
  //       valid: Joi.string().required(),
  //       free_pickup: Joi.string().required(),
  //       free_delivery: Joi.string().required(),
  //       routine_garments: Joi.string().required(),
  //       ironing: Joi.string().required(),
  //       steam_ironing: Joi.string().required(),
  //       wash_ironing: Joi.string().required(),
  //       dry_cleaning: Joi.string().required(),
  //       termConditions: Joi.string().allow(""),
  //       status: Joi.boolean().required(),
  //     });

  //     const { error } = packageSchema.validate(req.body);

  //     if (error) {
  //       return next(error);
  //     } else {
  //       const adminId = req.body;
  //       const packageId = req.params.id;

  //       const updatPackages = await packageModel.findByIdAndUpdate(
  //         packageId,
  //         req.body,

  //         { new: true }
  //       );
  //       res.json({ status: true, data: updatPackages });
  //     }
  //   },
  //   async delete(req, res, next) {
  //     const adminId = req.user._id;
  //     const packageId = req.params.id;

  //     const packageData = await packageModel.findOneAndRemove({
  //       _id: packageId,

  //     });

  //     res.json({ status: true, msg: "package deleted successfully", data: packageData });
  //   },
};

export default SubscriptionController;
