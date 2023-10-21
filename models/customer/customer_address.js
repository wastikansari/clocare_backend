import mongoose from "mongoose";
const Schema = mongoose.Schema;

const addressSchema = new Schema(
  {
    address_id: { type: Number },
    customer_id: { type: mongoose.Schema.Types.ObjectId },
    address_type: { type: String, default: "" },
    address_label: { type: String, default: "" },
    flat_no: { type: String, default: "" },
    street: { type: String, default: "" },
    landmark: { type: String, default: "" },
    state_id: { type: Number, default: "" },
    state_name: { type: String, default: "" },
    city_id: { type: Number, default: "" },
    city_name: { type: String, default: "" },
    pincode_id: { type: Number, default: "" },
    pincode_no: { type: String, default: "" },
    format_address: { type: String, default: "" },
    status: { type: Boolean, default: false },
  },
  { timestamps: true, _id: true, versionKey: false }
);

export default mongoose.model("address", addressSchema, "customers_address");
