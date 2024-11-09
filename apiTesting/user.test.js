const express = require("express");
const app = express();
const mongoose = require("mongoose");
const users = require("./MOCK_DATA.json");

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
    },
    lastName : {
        type : String,
        required : true,
    },
    gender : {
        type : String,
        required : true,

    },
    email : {
        type : String,
        required : true,
        unique: true,
    },
},{timestamps: true},);
const User = mongoose.model("user", userSchema);

app.get("/api/users", (req, res) => {
    return res.json(users);
})
app
.route("/api/users/:id",)
.get(async(req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
    // const user = users.find((user) =>user.id === id);
    // return res.json(user);
})

.patch(async(req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, {lastName: "changed"});
    return res.json({status: "success"});
})
.delete(async(req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    return res.json({status: "success"});
})




app.post("/api/users", async (req, res) => {  // Add async here
    const body = req.body;
    
    if (!body || !body.firstName || !body.lastName || !body.gender || !body.email) {  // Remove trailing ||
        return res.status(400).json({ message: "Invalid request" });
    }

    // try {
        const result = await User.create({
            firstName: body.firstName,
            lastName: body.lastName,
            gender: body.gender,
            email: body.email,
        });
        console.log(result)
        return res.status(201).json({msg:"success"});  // Send a success response with the result
    // } catch (error) {
    //     return res.status(500).json({ message: "Server error", error: error.message });  // Handle any errors
    // }
});