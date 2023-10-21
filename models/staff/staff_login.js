import mongoose from "mongoose";
const Schema = mongoose.Schema;

const staffLoginSchema = new Schema(
  {
    name: { type: String, default: "" },
    mobile: { type: Number, unique: true },
    email: { type: String, default: "" },
    role: { type: String, default: "staff" },
    password: { type: String },
    access_token: { type: String, default: "" },
  },
  { timestamps: true, _id: true, versionKey: false }
);

export default mongoose.model("staffLogin", staffLoginSchema, "staff_login");
