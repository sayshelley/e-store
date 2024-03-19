
import mongoose from 'mongoose';
import express from "express";
import dotenv from 'dotenv';
import path from 'path';
import userRoute from './router/userRouter.js';
import seedRoute from './router/seedRouter.js';
import productRoute from './router/productRouter.js';
import orderRoute from "./router/orderRouter.js";

dotenv.config();

// const database_url = process.env.MONGODB_URI||'mongodb://127.0.0.1/e-store';
const database_url = "mongodb://127.0.0.1/e-store";

mongoose.connect(database_url).then(() => {
    console.log("connected to db");
  }).catch((err) => {
    console.log(err.message);
  });


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/skishop/seed', seedRoute);



app.use('/skishop/products', productRoute);
app.use('/skishop/user', userRoute);
app.use('/skishop/orders',orderRoute);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/frontend/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/frontend/build/index.html"))
);

app.get("/", (req, res) => {
  res.send("server is ready");
});

//catch errors if there is errors from userRouter/async handler
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});



const port = process.env.PORT||3030;
app.listen(port, () => {
  console.log('server at ' + port);
});
//check
