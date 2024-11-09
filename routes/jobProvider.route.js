
const express = require('express');
const router = express.Router();
const createJobProvider= require('../controllers/jobprovider.controller.js');
const getjobProvider = require("../controllers/jobprovider.controller.js");

// Route for creating a new job provider
router.get("/providers", getjobProvider);
router.post('/providers', createJobProvider);

// Route for creating a new job seeker
// router.post('/seekers', createJobSeeker);

module.exports = router;
