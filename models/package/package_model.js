
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const packageSchema = new Schema(
  {
    package_name: { type: String, default: "" },
    package_code: { type: String, default: "" },
    prices: { type: String, default: "" },
    valid: { type: String, default: "" },
    free_pickup: { type: String, default: "" },
    free_delivery: { type: String, default: "" },
    routine_garments: { type: String, default: "" },
    ironing: { type: String, default: "" },
    steam_ironing: { type: String, default: "" },
    wash_ironing: { type: String, default: "" },
    dry_cleaning: { type: String, default: "" },
    termConditions: { type: String, default: "" },
    status: { type: Boolean, default: true },
  },
  { timestamps: true, _id: true, versionKey: false }
);

export default mongoose.model("package", packageSchema, "package");
