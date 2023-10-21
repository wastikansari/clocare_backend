// import { Package } from "../../models";
import Joi from "joi";
import CustomerLoginModel from "../../../models/customer/customer_login";
import CustomerTransaction from "../../../models/customer/customer_transaction";
const ObjectId = require("mongoose").Types.ObjectId;

const walletController = {
  async deposit(req, res, next) {
    // Validation
    const walletTransaction = Joi.object({
      amount: Joi.number().required(),
      transaction_id: Joi.string().required(),
      transaction_type: Joi.string().required(),
      payment_geteway_resporse: Joi.string().allow(""),
      amount_credit_reason: Joi.string().allow(""),
      amount_debit_reason: Joi.string().allow(""),
      message: Joi.string().allow(""),
      status: Joi.string().allow(""),
    });

    const { error } = walletTransaction.validate(req.body);
    if (error) {
      return res.json({ status: false, data: { error } });
    }

    const {
      amount,
      transaction_id,
      transaction_type,
      payment_geteway_resporse,
      amount_credit_reason,
      amount_debit_reason,
      message,
      status,
    } = req.body;
    const userId = req.user._id;

    if (amount <= 0) {
      return res
        .status(200)
        .json({ status: false, msg: `Invalid deposit amount ${amount}` });
    }
    try {
      const customer = await CustomerLoginModel.findById(userId);

      const recentDeposit = await CustomerTransaction.findOne({
        customer_id: userId,
        amount: amount,
        type: "credit",
        timestamp: { $gte: new Date(Date.now() - 60000) }, // 60 seconds
      });

      if (recentDeposit) {
        return res.status(200).json({
          status: false,
          msg: `You have already made a recent deposit ${amount}`,
        });
      }
      console.log(`step 0`);
      var balance = customer.wallet_balance.toString();
      var total = parseInt(balance) + parseInt(amount);
      console.log(
        `balance ${parseInt(balance)} + ${parseInt(balance)} = ${total}`
      );
      customer.wallet_balance = total;
      await customer.save();
      console.log(`step 1`);
      const customerTransaction = new CustomerTransaction({
        customer_id: userId,
        amount: amount,
        transaction_id: transaction_id,
        transaction_type: "credit",
        payment_geteway_resporse: payment_geteway_resporse,
        amount_credit_reason: amount_credit_reason,
        amount_debit_reason: amount_debit_reason,
        message: message,
        status: status,
      });
      console.log(`step 2`);
      await customerTransaction.save();
      console.log(`step 3`);
      res
        .status(200)
        .json({ status: true, msg: `Customer wallect credit ${amount}` });
    } catch (err) {
      return next(err);
    }
  },

  async balance(req, res, next) {
    const userId = req.user._id;

    try {
      const customer = await CustomerLoginModel.findById(userId);

      console.log(`dd ${customer.wallet_balance}`);
      if (customer) {
        res.status(200).json({
          status: true,
          data: { wallet_balance: customer.wallet_balance },
        });
      }
    } catch (err) {
      return next(err);
    }
  },
  async transaction(req, res, next) {
    const userId = req.user._id;
    try {
      const customer = await CustomerTransaction.find({ customer_id: userId });
      if (customer) {
        res.status(200).json({
          status: true,
          data: { customer },
        });
      }
    } catch (err) {
      return next(err);
    }
  },
};

export default walletController;
