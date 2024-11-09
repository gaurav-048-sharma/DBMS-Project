// models/jobseeker.model.js
const mongoose = require('mongoose');

const JobApplicationSchema = new mongoose.Schema({
    jobId: { 
        type: mongoose.Schema.Types.ObjectId, 
        default: new mongoose.Types.ObjectId(),
        required: true, 
        ref: 'JobProvider.jobListings' },
    providerId: { 
        type: mongoose.Schema.Types.ObjectId, 
        default: new mongoose.Types.ObjectId(),
        required: true, 
        ref: 'JobProvider' },
    dateApplied: { type: Date, default: Date.now },
    status: { type: String, default: "Applied" }
});

const JobSeekerSchema = new mongoose.Schema({
    seekerId: { type: mongoose.Schema.Types.ObjectId, default: new mongoose.Types.ObjectId() },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    skills: [String],
    appliedJobs: [JobApplicationSchema]
});

module.exports = mongoose.model('JobSeeker', JobSeekerSchema);







// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// // Job Application Schema (subdocument)
// const JobApplicationSchema = new Schema({
//     jobId: { type: Schema.Types.ObjectId,
//          required: true, ref: 'JobProvider.jobListings' 
//         },
//     providerId: { type: Schema.Types.ObjectId, 
//         required: true, ref: 'JobProvider' 
//     },
//     dateApplied: { type: Date, 
//         default: Date.now
//      },
//     status: { type: String, 
//         default: "Applied"
//      }
// });

// // Job Seeker Schema
// const JobSeekerSchema = new Schema({
//     seekerId: { type: Schema.Types.ObjectId, 
//         default: new mongoose.Types.ObjectId() 
//     },
//     name: { type: String,
//          required: true
//          },
//     email: { type: String,
//          required: true
//          },
//     phone: { type: String,
//          required: true
//          },
//     skills: [String],
//     appliedJobs: [JobApplicationSchema]  // Array of job applications with references
// });

// // Job Seeker Model
// const JobSeeker = mongoose.model('JobSeeker', JobSeekerSchema);

// module.exports = JobSeeker;
