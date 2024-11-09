// const express = require("express");
// const router = express.Router();
// const {getProvider, postProvider} = require("../controllers/jobprovider.controller.js");

// // router.get("/getprovider", getProvider);
// router.post("/postprovider", postProvider);

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// // const postProvider = require('../controllers/jobProvider.controller'); // Adjust path if necessary

// router.post('/jobprovider', postProvider);

// module.exports = router;


// routes/api.js
const express = require('express');
const router = express.Router();
const createJobProvider= require('../controllers/jobprovider.controller.js');
const getjobProvider = require("../controllers/jobprovider.controller.js");
// const createJobSeeker= require('../controllers/jobseeker.controller');

// Route for creating a new job provider
router.get("/providers", getjobProvider);
router.post('/providers', createJobProvider);

// Route for creating a new job seeker
// router.post('/seekers', createJobSeeker);

module.exports = router;
