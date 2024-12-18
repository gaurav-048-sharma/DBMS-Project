
const express = require('express');
const router = express.Router();
const createJobProvider= require('../controllers/jobprovider.controller.js');
const getjobProvider = require("../controllers/jobprovider.controller.js");

// Route for creating a new job provider
// router.delete("/providers/:id", getjobProvider.deleteProviders);
router.put("/providers/:id", getjobProvider.updateProviders);
router.post('/providers', createJobProvider.postProvider);
router.get('/providers/:id/delete', getjobProvider.confirmDeleteProvider);
router.delete("/providers/:id/delete", getjobProvider.deleteProviders);


router.get("/providers", getjobProvider.dashbaord);
router.get("/providers/new", getjobProvider.newprovider);
router.get("/providers/:id", getjobProvider.show);
router.get("/providers/:id/edit",getjobProvider.editproviders );

// Route for creating a new job seeker
router.get("/providers/:providerId/seekers", getjobProvider.getSeekers);
// router.post('/seekers', createJobSeeker);

module.exports = router;
