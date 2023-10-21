import mongoose from "mongoose";
const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    customer_id: { type: mongoose.Schema.Types.ObjectId },
    amount: { type: Number, default: 0 },
    transaction_id: { type: String, default: "" },
    transaction_type: { type: String, enum: ["credit", "debit"] },
    payment_gateway_resporse: { type: String, default: "" },
    amount_credit_reason: { type: String, default: "" },
    amount_debit_reason: { type: String, default: "" },
    message: { type: String, default: "" },
    status: { type: String, default: "" },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true, _id: true, versionKey: false }
);

export default mongoose.model(
  "Customer_transaction",
  transactionSchema,
  "customer_transaction"
);
