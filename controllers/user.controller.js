
const bcrypt = require('bcryptjs');
const User = require("../model/user.model.js");
const  {validationResult}  = require('express-validator');

const {v4: uuidv4} = require("uuid");
const { serUser } = require("../service/auth.js");
module.exports.getsignup = (req, res) => {
    return res.render("./authentication/signup.ejs");
}

module.exports.signUp = async(req, res) => {
    try {
        // Validate request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;
        console.log("Request body:", req.body);

        // Check if the user already exists by email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash the password
        const saltRounds = 10; // Adjust based on performance requirements
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user
        const newUser =await User.create({
            name,
            email,
            password: hashedPassword,
        });
        const result =await newUser.save();
        console.log(result);
        return res.render("./dashboard.ejs");
        // return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Error during signup:", error);
        return res.status(500).json({ message: "Internal server error" });
    }

    // const { name, email, password } = req.body;
    // const user = await User.findOne({ email });
    // if (user) {
    //     return res.status(400).json({ message: "Email already exists" });

    // }
    // const newUser = new User({ name, email, password });
    // await newUser.save();
    // return res.status(201).json({ message: "User created successfully" });

}
module.exports.getlogin = (req, res) => {
    res.render("./authentication/login.ejs");
}
module.exports.login = async(req, res) => {
        const {email, password } = req.body;

        // Check if the user already exists by email
        const existingUser = await User.findOne({ email, password });
        if (!existingUser) {
                res.render("./authentication/login.ejs", {
                message: "Invalid email or password",
            })

        } else {
            const sessionId = uuidv4();
            serUser(sessionId, existingUser);
            
            res.cookie("uid", sessionId)
            console.log("Request body:", req.body);
            res.redirect("/api/providers")
        }
        
        // return res.status(201).json({ message: "User created successfully" });
    

}
