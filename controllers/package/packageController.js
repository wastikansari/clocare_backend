import Joi from "joi";
import packageModel from "../../models/package/package_model";
import CustomErrorHandler from "../../service/CustomErrorHandler"

const packageController = {
  async create(req, res, next) {
    // Validation
    const packageSchema = Joi.object({
      package_name: Joi.string().required(),
      package_code: Joi.string().required(),
      prices: Joi.string().required(),
      valid: Joi.string().required(),
      free_pickup: Joi.string().required(),
      free_delivery: Joi.string().required(),
      routine_garments: Joi.string().required(),
      ironing: Joi.string().required(),
      steam_ironing: Joi.string().required(),
      wash_ironing: Joi.string().required(),
      dry_cleaning: Joi.string().required(),
      termConditions: Joi.string().allow(""),
      status: Joi.boolean().required(),
    });

    const { error } = packageSchema.validate(req.body);

    if (error) {
      return next(error);
    }
    // check if user is in the database already

    try {
      const existPackageCode = await packageModel.exists({
        package_code: req.body.package_code,
      });
      console.log(existPackageCode);
      if (existPackageCode) {
        return next(
          CustomErrorHandler.alreadyExist("This service package exested")
        );
      }
    } catch (err) {
      return next(err);
    }
    const {
      package_name,
      package_code,
      prices,
      valid,
      free_pickup,
      free_delivery,
      routine_garments,
      ironing,
      steam_ironing,
      wash_ironing,
      dry_cleaning,
      termConditions,
      status,
    } = req.body;

    const packages = new packageModel({
      package_name,
      package_code,
      prices,
      valid,
      free_pickup,
      free_delivery,
      routine_garments,
      ironing,
      steam_ironing,
      wash_ironing,
      dry_cleaning,
      termConditions,
      status,
    });

    await packages.save();

    res.status(200).json({ status: true, data: { packages } });
  },

  async read(req, res, next) {
    const packageList = await packageModel.find();

    res.json({ status: true, data: packageList });
  },

  async update(req, res, next) {
    const packageSchema = Joi.object({
      // package_id: Joi.string().required(),
      package_name: Joi.string().required(),
      package_code: Joi.string().required(),
      prices: Joi.string().required(),
      valid: Joi.string().required(),
      free_pickup: Joi.string().required(),
      free_delivery: Joi.string().required(),
      routine_garments: Joi.string().required(),
      ironing: Joi.string().required(),
      steam_ironing: Joi.string().required(),
      wash_ironing: Joi.string().required(),
      dry_cleaning: Joi.string().required(),
      termConditions: Joi.string().allow(""),
      status: Joi.boolean().required(),
    });

    const { error } = packageSchema.validate(req.body);

    if (error) {
      return next(error);
    } else {
      const adminId = req.body;
      const packageId = req.params.id;

      const updatPackages = await packageModel.findByIdAndUpdate(
        packageId,
        req.body,

        { new: true }
      );
      res.json({ status: true, data: updatPackages });
    }
  },
  async delete(req, res, next) {
    const adminId = req.user._id;
    const packageId = req.params.id;

    const packageData = await packageModel.findOneAndRemove({
      _id: packageId,
    
    });

    res.json({ status: true, msg: "package deleted successfully", data: packageData });
  },
};

export default packageController;
