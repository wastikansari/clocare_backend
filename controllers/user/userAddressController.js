// import { User } from "../../models";
// import Joi from "joi";
// import CustomErrorHandler from "../../services/CustomErrorHandler";

// const userAddressController = {
//   async create(req, res, next) {
//     // Validation
//     const addressSchema = Joi.object({
//       flat: Joi.string().required(),
//       area: Joi.string().required(),
//       city: Joi.string().required(),
//       pincode: Joi.string().required(),
//       state: Joi.string().required(),
//     });

//     const { error } = addressSchema.validate(req.body);
//     console.log(error);
//     if (error) {
//       return next(error);
//     }

//     const { flat, area, city, pincode, state } = req.body;
//     console.log(flat, area, city, pincode, state);

//     var id = req.user._id;
//     console.log(id);

//     var userData = await User.findOne({ _id: req.user._id });

//     var uFlat = userData.address.flat;
//     var uArea = userData.address.area;
//     var uCity = userData.address.city;
//     var uPincode = userData.address.pinconde;
//     var uState = userData.address.state;

//     let data;
//     try {
//       data = await User.findOne({ _id: req.user._id });
//       data.address.flat = flat == undefined ? uFlat : flat;
//       data.address.area = area == undefined ? uArea : area;
//       data.address.city = city == undefined ? uCity : city;
//       data.address.pinconde = pincode == undefined ? uPincode : pincode;
//       data.address.state = state == undefined ? uState : state;
//       data.save({ new: true });
//     } catch (err) {
//       return next(err);
//     }

//     res.status(200).json({ status: true });
//   },

//   async read(req, res, next) {
//     return res.json({ status: true, data: packages });
//   },

//   async update(req, res, next) {
//     return res.json({ status: true });
//   },

//   async delete(req, res, next) {
//     res.status(201).json({ status: true });
//   },
// };

// export default userAddressController;
