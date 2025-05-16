const express = require('express');
const router = express.Router();
const {signUp, getsignup, login, getlogin}= require("../controllers/user.controller.js");
// const getsignup= require("../controllers/user.controller.js");
const validateSignUp= require("../middleware.js");


router.post("/signup", validateSignUp,signUp);
router.post("/login", login)
router.get("/signup", getsignup);
router.get("/login", getlogin);

module.exports = router;