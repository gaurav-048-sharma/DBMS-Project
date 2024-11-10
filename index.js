const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 8080;
const fs = require("fs");
const JobSeekerRoutes = require("./routes/jobseeker.route.js");
const JobProviderRoutes = require("./routes/jobProvider.route.js")
const connectToMongoDB = require("./mongoose/DB.connect.js");
const path = require("path");
// const file = fs.writeFileSync("about.txt", "hello there");
// console.log(file, fs.write);


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));
app.use(express.json()); //to parse the incoming requests with JSON payloads (from req.body);
// app.use(cookieParser());
// app.get("/" , async (req, res) => {
//     const routes = await JobProviderRoutes.find({});
//     res.render("dashboard.ejs", {routes});
// })
app.get("/api", (req, res) => {
    res.render("dashboard.ejs");
})
app.use("/api", JobProviderRoutes);
app.use("/api", JobSeekerRoutes);



app.listen(port, (req, res) => {
    connectToMongoDB();
    console.log("server is running on port", port);
})