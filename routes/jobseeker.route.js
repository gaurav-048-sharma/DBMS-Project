const express = require('express');
const router = express.Router();
const createJobSeekers= require('../controllers/jobseeker.controller.js');
const createJobProvider= require('../controllers/jobprovider.controller.js');

// Route for creating a new job provider
router.put("/seekers/:id", createJobSeekers.updateSeekers);
router.post('/seekers', createJobSeekers.Seekercreate);
router.delete("/seekers/:id", createJobSeekers.deleteSeekers);
// router.get("/dashboard",createJobProvider.dashbaord);
router.get("/seekers",createJobSeekers.seekerdashboard );
router.get("/seekers/show", createJobSeekers.showSeekers)
router.get("/seekers/show/:id", createJobSeekers.seekerApplicants);
router.get("/seekers/:id/applynew", createJobSeekers.newSeeker);


router.get("/seekers/:id/edit",createJobSeekers.editseekers );


// Route for creating a new job seeker
// router.post('/seekers', createJobSeeker);

module.exports = router;