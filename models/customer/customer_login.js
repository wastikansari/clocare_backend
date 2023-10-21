import mongoose from "mongoose";
const Schema = mongoose.Schema;

const customerLoginSchema = new Schema(
  {
    name: { type: String, default: "" },
    mobile: { type: Number, unique: true },
    mobile_verified: { type: Boolean, default: true },
    email: { type: String, default: "" },
    email_verified: { type: Boolean, default: false },
    wallet_balance: { type: Number, default: 0, integer: true },
    unpaid_balance: { type: Number, default: 0 },
    familly_member: { type: Number, default: 0 },
    order_limit: { type: Number, default: 10 },
    gender: { type: String, default: "" },
    dob: { type: String, default: "dd-mm-yy" },
    profile_pic: { type: String, default: "" },
    access_token: { type: String, default: "" },
  },
  { timestamps: true, _id: true, versionKey: false }
);

export default mongoose.model(
  "CustomerLogin",
  customerLoginSchema,
  "customers_login"
);
