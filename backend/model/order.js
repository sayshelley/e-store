import mongoose from "mongoose";


const orderDetailSchema = new mongoose.Schema({
  product: { type: String},
  price: { type: String},
  num: { type: Number},
});

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String },
    orderName: { type: String },
    orderEmail: { type: String },
    orderDetail: [orderDetailSchema],
    itemsPrice: { type: Number },
    taxPrice: { type: Number },
    shippingPrice: { type: Number },
    totalPrice: { type: Number },
    orderYear: { type: Number },
    orderMonth: { type: Number },
    orderDay: { type: Number },
    pay: { type: Boolean },
    paymentMethod: { type: String },
    addressInfo: {
      fullName: { type: String },
      address: { type: String },
      province: { type: String },
      postalCode: { type: String },
      phoneNumber: { type: String },
    },
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },
  },
  {
    timestamps: true,
  }
);


const Order = mongoose.model("Order", orderSchema);
export default Order;
