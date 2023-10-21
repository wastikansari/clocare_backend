// import { UserPackage } from "../../models";
// import Joi from "joi";
// import CustomErrorHandler from "../../services/CustomErrorHandler";
// import jwt from 'jsonwebtoken';

// const packageController = {
//   async create(req, res, next) {
//     // Validation
//     const packageSchema = Joi.object({
//       category: Joi.string(),
//       packages:Joi.string(),
//       categoryId: Joi.string().required(),
//       packageId: Joi.string().required(),
//       phone:Joi.string(),
//     });

//     const { error } = packageSchema.validate(req.body);
//     console.log(error);
//     if (error) {
//       return next(error);
//     }
//     // check if user is in the database already
//     var dat = req.body.categoryName;
//     console.log("data" + dat);

//     try {
//       const existPackageId = await UserPackage.exists({
//         packageId: req.body.packageId,
//       });
//       console.log(existPackageId);
//       if (existPackageId) {
//         return next(
//           CustomErrorHandler.alreadyExist(
//             "This service package user already buy"
//           )
//         );
//       }
//     } catch (err) {
//       console.log(err);
//       return next(err);
//     }

//     const { category, packages, categoryId, packageId, phone } = req.body;
//     console.log(category, packages, categoryId, packageId, phone);

//     // const token = req.headers.authorization.split(' ')[1];
//     // const decodedToken = jwt.verify(token, 'secretkey');
//     // const userId = decodedToken.userId;

//     var id = req.user._id;
//     console.log(id);

//     // database model
//     const userPackage = new UserPackage({
//       userId: id,
//       category: category,
//       package: packages,
//       categoryId: categoryId,
//       packageId: packageId,
//       phone: phone,
//     });
//     console.log(packages);

//     try {
//       console.log("categoryName1");
//       const result = await userPackage.save();
//       console.log("categoryName2");
//       console.log("result" + result);
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

// export default packageController;
