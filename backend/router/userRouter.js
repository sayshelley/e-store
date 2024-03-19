import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../model/user.js';
import bcrypt from "bcryptjs";
import { generateToken } from '../utils.js';

// by this we can define multiple files to have the routers
//create new instance
const userRoute = express.Router();

//difine "GET" method
// make it async since we are using mongoose
userRoute.post(
    '/signin',expressAsyncHandler( async (req, res) => {
    
    const newUser = await User.findOne({email: req.body.email});
    if (newUser){
        if (bcrypt.compareSync(req.body.password, newUser.psw)){
            res.send({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                admin: newUser.admin,
                token: generateToken(newUser),
            });
            return;
        }
    }
    res.status(401).send({message: 'Wrong email or password'})
    
}));
 
//api for signup

userRoute.post(
    '/signup',
    expressAsyncHandler(async (req, res) => {
        const createNewUser = new User({
            name: req.body.name,
            email: req.body.email,
            psw: bcrypt.hashSync(req.body.password),
        });
        //save user in the database
        const createdUser = await createNewUser.save();

        res.send({
            _id: createdUser._id,
            name: createdUser.name,
            email: createdUser.email,
            admin: createdUser.admin,
            token: generateToken(createdUser),
        });

    })
);



export default userRoute;
//this is a command
