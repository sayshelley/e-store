import express from "express";
import Order from "../model/order.js";
import Usage from "../model/usage.js";

const orderRoute = express.Router();

orderRoute.get("/", async (req, res) => {
  const allOrders = await Order.find();
  res.send(allOrders);
});

orderRoute.post(
  "/",
  async (req, res) => {
    const newOrder = new Order({
      addressInfo: req.body.addressInfo,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      //user: req.user._id,
    });

    const order = await newOrder.save();
    res.status(201).send({ message: "Now New Order is Created", order }); //To frontend leadTo(`/order/${data.order._id}`);
  }
);
orderRoute.get("/allyears", async (req, res) => {
  const allYears = await Order.distinct("orderYear");

  res.send(allYears);
});
orderRoute.get("/allmonths", async (req, res) => {
  const allMonths = await Order.distinct("orderMonth");
  res.send(allMonths);
});
orderRoute.get("/sellsreport", async (req, res) => {
  const month = req.query.month || "";
  const year = req.query.year || "";
  const findByMonth = month && month !== "all" ? month : {};
  const findByYear = year && year !== "all" ? year : {};

  var orders;
  if (month && month !== "all" && year && year !== "all") {
    orders = await Order.find({
      orderMonth: findByMonth,
      orderYear: findByYear,
    });
  } else if (month && month !== "all")
    orders = await Order.find({
      orderMonth: findByMonth,
    });
  else if (year && year !== "all") {
    orders = await Order.find({
      orderYear: findByYear,
    });
  } else {
    orders = await Order.find();
  }
  if (orders && orders.length > 0) {
    res.send(orders);
  } else {
    res
      .status(404)
      .send({ message: "We didn't sell any product duing this time:(" });
  }
});

orderRoute.get("/usagereport", async (req, res) => {
  const allUsage = await Usage.find();
  res.send(allUsage);
});

orderRoute.get(
  "/:id",
  async (req, res) => {
    const order = await Order.findById(req.params.id); //function from mongdb
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: "This Order Not Found" });
    }
  }
);





export default orderRoute;