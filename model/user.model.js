const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true },
    email: { 
        type: String, 
        required: true, 
        unique: true ,
        },
    password: { 
        type: String,
        required: true },
    
}, {timestamps:true})
const Authuser = mongoose.model('Authuser', userSchema);
module.exports = Authuser;