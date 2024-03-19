import mongoose from "mongoose";

const usageSchema = new mongoose.Schema(
  {
    IPAddress: { type: String },
    visitDate: { type: String },
    eventType: { type: String },
    productTag: { type: String },
  },
  {
    timestamps: true,
  }
);



const Usage = mongoose.model("Usage", usageSchema);
export default Usage;
