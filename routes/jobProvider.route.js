
const express = require('express');
const router = express.Router();
const createJobProvider= require('../controllers/jobprovider.controller.js');
const getjobProvider = require("../controllers/jobprovider.controller.js");

// Route for creating a new job provider

router.post('/providers', createJobProvider.postProvider);
router.get("/providers", getjobProvider.dashbaord);
router.get("/providers/new", getjobProvider.newprovider);
router.get("/providers/:id", getjobProvider.show);


// Route for creating a new job seeker
// router.post('/seekers', createJobSeeker);

module.exports = router;
