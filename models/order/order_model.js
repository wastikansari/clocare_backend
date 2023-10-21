import mongoose from "mongoose";
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    customer_id: { type: mongoose.Schema.Types.ObjectId, required: true }, // ordet_type [Service order, Basket order]
    order_no: { type: String, required: true },
    order_display_no: { type: String, required: true },
    order_type: { type: String, default: "Service order" },
    service_id: { type: Number, default: 0 },
    no_of_servic: { type: Number, default: 1 },
    service_name: { type: String, required: true },
    items: { type: Number, required: true },
    items_list: { type: String, default: "" }, // Baket order list of garment
    amount: { type: Number, default: 0 },
    payment_type: { type: String, required: true }, // cod, cop, wallet, cash
    payment_status: { type: String, enum: ["Paid", "Unpaid"] }, // paid or unpaid
    rcvd_items: { type: Number, default: 0 },
    dlvrd_items: { type: Number, default: 0 },
    pickup_date: { type: String, required: true },
    pickup_time: { type: String, required: true },
    delivery_date: { type: String, required: true },
    delivery_time: { type: String, required: true },
    pickup_address: { type: String, default: "" },
    delivery_address: { type: String, default: "" },
    pickup_address_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    delivery_address_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    delivery_attempts: { type: Number, default: 0 },
    payment_method: { type: String, default: "" },
    delivery_charges: { type: String, default: "" },
    pay_on_pickup: { type: String, default: "" },
    ord_status: { type: String, required: true },
  },
  { timestamps: true, _id: true, versionKey: false }
);

export default mongoose.model("orders", orderSchema, "customers_orders");
