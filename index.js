const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 8080;
const fs = require("fs");

const file = fs.writeFileSync("./contact.text", "hello there");
console.log(file, fs.write);

main()
.then(() => console.log("mongodb connected"))
.catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/JobPortal');
}



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
    }

});
const User = mongoose.model("User", userSchema);


app.listen(port, (req, res) => {
    console.log("server is running on port", port);
})