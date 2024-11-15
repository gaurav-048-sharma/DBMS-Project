// models/jobprovider.model.js
const mongoose = require('mongoose');

const JobListingSchema = new mongoose.Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, default: new mongoose.Types.ObjectId() },
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    requirements: [String],
    salary: { type: String, required: true },
    datePosted: { type: Date, default: Date.now },
    applicants: [
        {
             type: mongoose.Schema.Types.ObjectId,
             ref: 'JobSeeker' 
        }
    ]  // Reference to job seekers
});

const JobProviderSchema = new mongoose.Schema({
    providerId: { type: mongoose.Schema.Types.ObjectId, default: new mongoose.Types.ObjectId() },
    name: { type: String, required: true },
    contactEmail: { type: String, required: true },
    contactPhone: { type: String, required: true },
    jobListings: [JobListingSchema]
});

module.exports = mongoose.model('JobProvider', JobProviderSchema);



// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// // Job Listing Schema (subdocument)
// const JobListingSchema = new Schema({
//     jobId: {
//         type: Schema.Types.ObjectId,
//         default: new mongoose.Types.ObjectId(),
//     },
//     title: { type: String, required: true },
//     description: { type: String, required: true },
//     location: { type: String },
//     salary: { type: Number },
//     datePosted: { type: Date, default: Date.now },
// });

// // Job Provider Schema
// const JobProviderSchema = new Schema({
//     providerId: {
//         type: Schema.Types.ObjectId,
//         default: new mongoose.Types.ObjectId(),
//     },
//     name: { type: String, required: true },
//     contactEmail: { type: String, required: true },
//     contactPhone: { type: Number, required: true },
//     jobListings: [JobListingSchema], // Array of job listings
// },{timestamps: true},);

// // Job Provider Model
// const JobProvider = mongoose.model("JobProvider", JobProviderSchema);

// module.exports = JobProvider;
