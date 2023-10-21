import Joi from "joi";
import CustomerAddress from "../../../models/customer/customer_address";
import CustomerLoginModel from "../../../models/customer/customer_login";

const addressController = {
  async create(req, res, next) {
    // Validation
    const addressSchema = Joi.object({
      flat_no: Joi.string().required(),
      street: Joi.string().required(),
      landmark: Joi.string().required(),
      state_id: Joi.number().required(),
      state_name: Joi.string().required(),
      city_id: Joi.number().required(),
      city_name: Joi.string().required(),
      pincode_id: Joi.number().required(),
      pincode_no: Joi.string().required(),
      address_type: Joi.string().required(),
      address_label: Joi.string().required(),
      status: Joi.bool().required(),
    });

    const { error } = addressSchema.validate(req.body);

    if (error) {
      res.json({ status: false, data: { error } });
    } else {
      const {
        flat_no,
        street,
        landmark,
        state_id,
        state_name,
        city_id,
        city_name,
        pincode_id,
        pincode_no,
        address_type,
        address_label,
        status,
      } = req.body;
      const userId = req.user._id;
      const user = await CustomerLoginModel.findById(userId);

      if (status == true) {
        // const address = await CustomerAddress.find({ userId });
        try {
          const result = await CustomerAddress.updateMany(
            { customer_id: userId },
            { $set: { status: false } } // Set the new status value here
          );
          console.log(`Updated ${result.modifiedCount} addresses`);
        } catch (error) {
          console.error("Error updating addresses:", error);
        }
      }
      const customerAddress = new CustomerAddress({
        customer_id: user._id,
        flat_no,
        street,
        landmark,
        state_id,
        state_name,
        city_id,
        city_name,
        pincode_id,
        pincode_no,
        address_type,
        address_label,
        status,
        format_address: `${flat_no}, ${street}, ${landmark}, ${city_name}, ${state_name} - ${pincode_no}`,
      });
      await customerAddress.save();
      res.json({ status: true, msg: "address create successfully" });
    }
  },
  async read(req, res, next) {
    const userId = req.user._id;

    const address = await CustomerAddress.find({ customer_id: userId });

    res.json({ status: true, data: address });
  },
  async update(req, res, next) {
    // Validation
    const addressSchema = Joi.object({
      flat_no: Joi.string().required(),
      street: Joi.string().required(),
      landmark: Joi.string().required(),
      state_id: Joi.number().required(),
      state_name: Joi.string().required(),
      city_id: Joi.number().required(),
      city_name: Joi.string().required(),
      pincode_id: Joi.number().required(),
      pincode_no: Joi.string().required(),
      address_type: Joi.string().required(),
      address_label: Joi.string().required(),
      status: Joi.bool().required(),
    });

    const { error } = addressSchema.validate(req.body);

    if (error) {
      return res.json({ status: false, data: { error } });
    } else {
      const customerId = req.user._id;
      const addressId = req.params.id;

      const {
        flat_no,
        street,
        landmark,
        state_id,
        state_name,
        city_id,
        city_name,
        pincode_id,
        pincode_no,
        address_type,
        address_label,
        status,
      } = req.body;

      if (status == true) {
        // const address = await CustomerAddress.find({ userId });
        try {
          const result = await CustomerAddress.updateMany(
            { customer_id: customerId },
            { $set: { status: false } } // Set the new status value here
          );
          console.log(`Updated ${result.modifiedCount} addresses`);
        } catch (error) {
          console.error("Error updating addresses:", error);
        }
      }

      const address = await CustomerAddress.findOne({
        _id: addressId,
        customer_id: customerId,
      });

      address.flat_no = flat_no;
      address.street = street;
      address.landmark = landmark;
      address.state_id = state_id;
      address.state_name = state_name;
      address.city_id = city_id;
      address.city_name = city_name;
      address.pincode_id = pincode_id;
      address.pincode_no = pincode_no;
      address.address_type = address_type;
      address.address_label = address_label;
      address.status = status;
      (address.format_address = `${flat_no}, ${street}, ${landmark}, ${city_name}, ${state_name} - ${pincode_no}`),
        await address.save();

      res.json({ status: true, msg: "address update successfully" });
    }
  },
  async delete(req, res, next) {
    const customerId = req.user._id;
    const addressId = req.params.id;

    const address = await CustomerAddress.findOneAndRemove({
      _id: addressId,
      customer_id: customerId,
    });

    res.json({ status: true, msg: "address deleted successfully" });
  },
};

export default addressController;
