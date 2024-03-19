import express from 'express';
import product from '../model/product.js';
import data from '../data.js';
import User from '../model/user.js';
import Order from "../model/order.js";
import Usage from "../model/usage.js";

const seedRoute = express.Router();

seedRoute.get('/', async (req,res) =>{
    //seed for product
    await product.remove({});
    const newProduct = await product.insertMany(data.products);//insert an array of products to product model in the database
    //seed for user
    await User.remove({});
    const newUser = await User.insertMany(data.user);
    
    //seed for order
    await Order.remove({});
    const newOrder = await Order.insertMany(data.order);

    await Usage.remove({});
    const newUsage = await Usage.insertMany(data.usage);
    res.send({ newProduct, newUser, newOrder, newUsage });
}
);

export default seedRoute;