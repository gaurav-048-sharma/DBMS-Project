// const express = require("express");
// const app = express();

// const {getEmployer, postEmployer} = require("../controllers/employer.controller");

// app.get("api/getemployer", getEmployer);
// app.post("api/postemployer", postEmployer);


const express = require('express');
const router = express.Router();
const createJobSeekers= require('../controllers/jobseeker.controller.js');
// const createJobSeeker= require('../controllers/jobseeker.controller');

// Route for creating a new job provider
router.post('/seekers', createJobSeekers);

// Route for creating a new job seeker
// router.post('/seekers', createJobSeeker);

module.exports = router;