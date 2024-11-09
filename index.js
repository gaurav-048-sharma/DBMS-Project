const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 8080;
const fs = require("fs");
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


app.listen(port, (req, res) => {
    connectToMongoDB();
    console.log("server is running on port", port);
})