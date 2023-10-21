// import { Service } from "../../models";
// import Joi from "joi";
// import CustomErrorHandler from "../../services/CustomErrorHandler";

// const categoryController = {
//   async create(req, res, next) {
//     // Validation
//     const categorySchema = Joi.object({
//       categoryName: Joi.string().required(),
//     });

//     const { error } = categorySchema.validate(req.body);
//     console.log(error);
//     if (error) {
//       return next(error);
//     }
//     // check if user is in the database already
//     var dat = req.body.categoryName;
//     console.log("data" + dat);

//     try {
//       const existName = await Service.exists({
//         categoryName: req.body.categoryName,
//       });
//       console.log(existName);
//       if (existName) {
//         return next(
//           CustomErrorHandler.alreadyExist("This service category exested")
//         );
//       }
//     } catch (err) {
//       console.log(err);
//       return next(err);
//     }

//     const { categoryName } = req.body;
//     console.log(categoryName);

//     // database model
//     const service = new Service({
//       categoryName: categoryName,
//     });
//     console.log("categoryName");

//     try {
//       console.log("categoryName1");
//       const result = await service.save();
//       console.log("categoryName2");
//       console.log("result" + result);
//     } catch (err) {
//       return next(err);
//     }

//     res.status(200).json({ status: true });
//   },

//   async read(req, res, next) {
//     let service;
//     try {
//       service = await Service.find()
//       console.log("user data" + service);
//       if (!service) {
//         return next(CustomErrorHandler.notFound());
//       }
//     } catch (err) {
//       return next(err);
//     }
//     return res.json({ status: true, data: service });
//   },

//   async update(req, res, next) {
//     console.log(req.body);
//     const categorySchema = Joi.object({
//       categoryName: Joi.string().required(),
//     });

//     const { error } = categorySchema.validate(req.body);
//     console.log(error);
//     if (error) {
//       return next(error);
//     }
//     const id = req.params.id;

//     const { categoryName } = req.body;

//     let data;

//     data = await Service.updateOne(
//       // {_id:{ _id:req.user._id}},
//       { "_id": id },
//       {
//         $set: {
//           "categoryName": categoryName,
        
//         },
//       },
//       { new: true }
//     );
//     return res.json({ status: true });
//   },

//   async delete(req, res, next) {
//     console.log('data');
//     const id = req.params.id;

//     let data;
//     try {
//       data = await Service.deleteOne(
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

// export default categoryController;
