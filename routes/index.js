import express from "express";
const router = express.Router();
import staffController from "../controllers/staff/auth/staff_controller";
import registerController from "../controllers/customer/auth/registerController";
import sendOtpController from "../controllers/customer/auth/sendotpController";
import loginController from "../controllers/customer/auth/loginController";
import addressController from "../controllers/customer/address/addressController";
import packageController from "../controllers/package/packageController";
import walletController from "../controllers/customer/wallet/walletController";
import profileController from "../controllers/customer/profile_controllers";
import orderController from "../controllers/orders/orderController";
import subscriptionController from "../controllers/customer/subscription/subscription_controllers";
import auth from "../middlewares/auth";
import { adminAuth, admin } from "../middlewares/admin";

// customer authentication
router.post("/send-otp", sendOtpController.sendOtp);
router.post("/check-mobile", sendOtpController.checkMobile);
router.post("/register", registerController.register);
router.post("/login", loginController.login);

// customer profile
router.post("/customer/profile/update", auth, profileController.update);
router.post("/customer/profile/email/update", auth, profileController.emailUpdate);
router.get("/customer/profile", auth, profileController.profile);

// customer address
router.post("/address/add", auth, addressController.create);
router.get("/address/list", auth, addressController.read);
router.post("/address/update/:id", auth, addressController.update);
router.delete("/address/delete/:id", auth, addressController.delete);

// customer wallet
router.post("/customer/wallet/deposit", auth, walletController.deposit);
router.get("/customer/wallet/balance", auth, walletController.balance);
router.get("/customer/wallet/transaction", auth, walletController.transaction);

// customer orders
router.post("/customer/service/order/create", auth, orderController.serviceOrdercreate);
router.post("/customer/basket/order/create", auth, orderController.basketOrderSchema);

// customer subscription
router.post("/customer/package/subscription/create",auth,subscriptionController.create);

// -------------------------------------------- Dashboard controller ------------------------------------------------

// staff authentication
router.post("/dashboard/staff/register", staffController.register);
router.post("/dashboard/staff/login", staffController.login);

// dashboard package
router.post("/dashboard/package/add", [adminAuth, admin], packageController.create);
router.get("/dashboard/package/list", packageController.read);
router.put("/dashboard/package/update/:id", [adminAuth, admin], packageController.update);
router.delete("/dashboard/package/delete/:id", [adminAuth, admin], packageController.delete);

// dashboard orders
// router.post("/dashboard/orders/create",[adminAuth, admin], packageController.create);
router.get("/dashboard/orders/get", [adminAuth, admin], orderController.read);
// router.put("/dashboard/orders/update",[adminAuth, admin], orderController.update);
router.delete("/dashboard/orders/delete/:id", [adminAuth, admin], orderController.delete );

export default router;
