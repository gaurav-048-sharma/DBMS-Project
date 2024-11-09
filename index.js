const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 8080;
const fs = require("fs");
const users = require("./MOCK_DATA.json");
const JobSeekerRoutes = require("./routes/jobseeker.route.js");
const JobProviderRoutes = require("./routes/jobProvider.route.js")
const connectToMongoDB = require("./mongoose/DB.connect.js");
// const file = fs.writeFileSync("about.txt", "hello there");
// console.log(file, fs.write);

app.use(express.urlencoded({extended:true}));
app.use(express.json()); //to parse the incoming requests with JSON payloads (from req.body);
// app.use(cookieParser());
app.use("/api", JobProviderRoutes);
app.use("/api", JobSeekerRoutes);

// main()
// .then(() => console.log("mongodb connected"))
// .catch(err => console.log(err));
// async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/JobPortal');
// }

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


app.listen(port, (req, res) => {
    connectToMongoDB();
    console.log("server is running on port", port);
})