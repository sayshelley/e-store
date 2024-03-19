import mongoose from 'mongoose';
//create a user with all properties
const userOutline = new mongoose.Schema({
    name : {type: String, required: true},
    email: {type: String, required: true, unique: true},
    psw : {type: String, required: true},
    //boolean value, default is false
    admin: {type: Boolean, default: false, required: true}

}, /*options*/{
    timestamps: true,
})
// model

const User = mongoose.model('User', userOutline);

export default User;