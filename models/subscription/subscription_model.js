import mongoose from "mongoose";
const Schema = mongoose.Schema;

const customerSubscriptionSchema = new Schema(
  {
    customer_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    package_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    address_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    email: { type: String, default: "" },
    amount: { type: Number, default: 0 },
    payment_status: { type: String, enum: ["Paid", "Unpaid"] },
    payment_type: { type: String, default: "" }, // wallet, upi, cash
    transaction_id: { type: String, default: "" },
    total_garments: { type: String, default: "" },
    package_valid: { type: String, default: "" },
    package_prices: { type: String, default: "" },
    pickup_day: { type: String, default: "" },
    pickup_slot: { type: String, default: "" },
    delivery_type: { type: String, default: "" },
    package_invoice: { type: String, default: "" },
    no_of_orders: { type: Number, default: 0 },
  },
  { timestamps: true, _id: true, versionKey: false }
);

export default mongoose.model(
  "customerSubscription",
  customerSubscriptionSchema,
  "customer_subscription"
);
