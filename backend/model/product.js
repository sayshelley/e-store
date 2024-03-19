import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    // name:{type: String, required:true},
    comment: {type: String, required: true},
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    tag: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, default: 0, required: true },
    numLeft: { type: Number, default: 0, required: true },
    brand: { type: String, required: true },
    grade: { type: Number, default: 0, required: true },
    peopleReviews: { type: Number, default: 0, required: true },
    description: { type: String, required: true },
    reviews:[reviewSchema]
  },
    {
    timestamps: true,
  }
);

const product = mongoose.model("product", productSchema);

export default product;