// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const Transaction = require('../models/Transaction');

// // Get user's wallet balance
// router.get('/wallet/balance', authenticateUser, async (req, res) => {
//   try {
//     const userId = req.user._id; // Assuming user data is attached to req.user
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     res.status(200).json({ balance: user.walletBalance });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Add money to the user's wallet
// router.post('/wallet/deposit', authenticateUser, async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const amount = req.body.amount; // Amount to deposit

//     if (amount <= 0) {
//       return res.status(400).json({ error: 'Invalid deposit amount' });
//     }

//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     // Update wallet balance and create a transaction record
//     user.walletBalance += amount;
//     await user.save();

//     // Create a transaction record
//     const transaction = new Transaction({
//       userId: userId,
//       amount: amount,
//       type: 'credit', // 'credit' for deposit
//     });
//     await transaction.save();

//     res.status(200).json({ message: 'Deposit successful' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Place an order using wallet balance
// router.post('/wallet/order', authenticateUser, async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const orderAmount = req.body.amount; // Amount for the order

//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     if (user.walletBalance < orderAmount) {
//       return res.status(400).json({ error: 'Insufficient wallet balance' });
//     }

//     // Update wallet balance and create a transaction record for the order
//     user.walletBalance -= orderAmount;
//     await user.save();

//     const orderTransaction = new Transaction({
//       userId: userId,
//       amount: orderAmount,
//       type: 'debit', // 'debit' for order payment
//     });
//     await orderTransaction.save();

//     res.status(200).json({ message: 'Order placed successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;
