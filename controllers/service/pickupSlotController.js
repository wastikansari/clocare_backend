// import { PickupSlot } from "../../models";
// import Joi from "joi";
// import CustomErrorHandler from "../../services/CustomErrorHandler";

// const pickupSlotController = {
//   async create(req, res, next) {
//     console.log(req.body);
//     // Validation
//     const pickupSlotSchema = Joi.object({
//       pickupSlot: Joi.string().required(),

//     });

//     const { error } = pickupSlotSchema.validate(req.body);
//     console.log(error);
//     if (error) {
//       return next(error);
//     }
//     // check if user is in the database already
//     var dat = req.body.pickupSlot;
//     console.log("data" + dat);

//     try {
//       const existpickupSlot = await PickupSlot.exists({
//         pickupSlot: req.body.pickupSlot,
//       });
//       console.log(existpickupSlot);
//       if (existpickupSlot) {
//         return next(
//           CustomErrorHandler.alreadyExist("This service pickup slot already there")
//         );
//       }
//     } catch (err) {
//       console.log(err);
//       return next(err);
//     }

//     const { pickupSlot } = req.body;


//     // database model
//     const slot = new PickupSlot({
//       pickupSlot: pickupSlot,

//     });
//     console.log(slot);

//     try {
//       console.log("categoryName1");
//       const result = await slot.save();
//       console.log("categoryName2");
//       console.log("result" + result);
//     } catch (err) {
//       return next(err);
//     }

//     res.status(200).json({ status: true });
//   },

//   async read(req, res, next) {
//     let slot;
//     try {
//       slot = await PickupSlot.find()
//       console.log("user data" + slot);
//       if (!slot) {
//         return next(CustomErrorHandler.notFound());
//       }
//     } catch (err) {
//       return next(err);
//     }
//     return res.json({ status: true, data: slot });
//   },

//   async update(req, res, next) {
//     console.log(req.body);
   
//     const id = req.params.id;

//     const { pickupSlot } = req.body;

//     let data;

//     data = await PickupSlot.updateOne(
//       // {_id:{ _id:req.user._id}},
//       { "_id": id },
//       {
//         $set: {
//           pickupSlot: pickupSlot,

        
//         },
//       },
//       { new: true }
//     );
//     return res.json({ status: true });
//   },

//   async delete(req, res, next) {

//     const id = req.params.id;
//     console.log('data'+ id);

//     let data;
//     try {
//       data = await PickupSlot.deleteOne(
//         { "_id": id },

//         { new: true }
//       );
//       // data.save({new:true});
//     } catch (err) {
//       return next(err);
//     }
//     res.status(201).json({ status: true });
//   },
// };

// export default pickupSlotController;
