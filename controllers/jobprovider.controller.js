// controllers/jobprovider.controller.js
const JobProvider = require('../model/jobprovider.model.js');


const getProvider = async(req, res) => {
    const allgetusers = await JobProvider.find({});
    return res.json(allgetusers);
}

module.exports = getProvider;

const postProvider = async (req, res) => {
    const { name, contactEmail, contactPhone, jobListings } = req.body;

    // Validate top-level fields
    if (!name) console.log("Missing: name");
    if (!contactEmail) console.log("Missing: contactEmail");
    if (!contactPhone) console.log("Missing: contactPhone");
    if (!Array.isArray(jobListings) || jobListings.length === 0) console.log("Missing or empty: jobListings");

    if (!name || !contactEmail || !contactPhone || !Array.isArray(jobListings) || jobListings.length === 0) {
        return res.status(400).json({ message: "Invalid request: Missing required fields" });
    }

    // Validate each job listing
    for (const [index, listing] of jobListings.entries()) {
        if (!listing.title) console.log(`Missing: jobListings[${index}].title`);
        if (!listing.description) console.log(`Missing: jobListings[${index}].description`);
        if (!listing.location) console.log(`Missing: jobListings[${index}].location`);
        if (!listing.salary) console.log(`Missing: jobListings[${index}].salary`);
        if (!listing.datePosted) console.log(`Missing: jobListings[${index}].datePosted`);

        if (!listing.title || !listing.description || !listing.location || !listing.salary || !listing.datePosted) {
            return res.status(400).json({ message: "Invalid request: Missing required fields in job listing" });
        }
    }

    try {
        const newProvider = new JobProvider({
            name,
            contactEmail,
            contactPhone,
            jobListings
        });
        const result = await newProvider.save();
        return res.status(201).json({ message: "Job provider created successfully", data: result });
    } catch (error) {
        console.error("Error creating job provider:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports =postProvider;









// // controllers/jobprovider.controller.js
// const JobProvider = require('../model/jobprovider.model.js');

// const postProvider = async (req, res) => {
//     const { name, contactEmail, contactPhone, jobListings } = req.body;

//     // Validate top-level fields
//     if (!name || !contactEmail || !contactPhone || !Array.isArray(jobListings) || jobListings.length === 0) {
//         return res.status(400).json({ message: "Invalid request: Missing required fields" });
//     }

//     // Validate each job listing
//     for (const listing of jobListings) {
//         if (!listing.title || !listing.description || !listing.location || !listing.salary || !listing.datePosted) {
//             return res.status(400).json({ message: "Invalid request: Missing required fields in job listing" });
//         }
//     }

//     try {
//         const newProvider = new JobProvider({
//             name,
//             contactEmail,
//             contactPhone,
//             jobListings
//         });
//         console.log(newProvider);
//         const result = await newProvider.save();
//         return res.status(201).json({ message: "Job provider created successfully", data: result });
//     } catch (error) {
//         return res.status(500).json({ message: "Server error", error: error.message });
//     }
// };

// module.exports = postProvider;







// const JobProvider = require("../model/jobprovider.model.js");

// const postProvider = async (req, res) => {
//     const body = req.body;

//     // Check required fields for JobProvider
//     if (
//         !body ||
//         !body.name ||
//         !body.contactEmail ||
//         !body.contactPhone ||
//         // !body.jobListings ||
//         !Array.isArray(body.jobListings) 
//         // body.jobListings.length === 0
//     ) {
//         return res.status(400).json({ message: "Invalid request: Missing required fields in JobProvider" });
//     }

//     // Check required fields for the first job listing in jobListings
//     const jobListing = body.jobListings[0];
//     if (
//         !jobListing.title ||
//         !jobListing.description ||
//         !jobListing.location ||
//         !jobListing.salary ||
//         !jobListing.datePosted
//     ) {
//         return res.status(400).json({ message: "Invalid request: Missing required fields in job listing" });
//     }

//     // try {
//         // Create a new JobProvider document with jobListings array
//         const result = await JobProvider.create({
//             name: body.name,
//             contactEmail: body.contactEmail,
//             contactPhone: body.contactPhone,
//             jobListings: [
//                 {
//                     title: jobListing.title,
//                     description: jobListing.description,
//                     location: jobListing.location,
//                     salary: jobListing.salary,
//                     datePosted: jobListing.datePosted,
//                 }
//             ]
//         });

//         console.log(result);
//         return res.status(201).json({ message: "Job provider created successfully", data: result });
//     // } catch (error) {
//     //     console.error("Error creating job provider:", error);
//     //     return res.status(500).json({ message: "Server error", error: error.message });
//     // }
// };

// module.exports = postProvider;



// const JobProvider = require("../model/jobprovider.model.js");

// const postProvider = async (req, res) => {
//     const body = req.body;
//     if (
//         !body ||
//         !body.name ||
//         !body.contactEmail ||
//         !body.contactPhone ||
//         !body.jobListings ||
//         // !body.jobId ||
//         !body.title ||
//         !body.description ||
//         !body.location ||
//         !body.salary ||
//         !body.datePosted
//     ) {
//         return res.status(400).json({ message: "Invalid request" });
//     }

//     const result = await JobProvider.create({
//         name: body.name,
//         contactEmail: body.contactEmail,
//         contactPhone: body.contactPhone,
//         jobListings: [
//             {
//                 // jobId: body.jobId,
//                 title: body.title,  // corrected from body.providerId to body.title
//                 description: body.description,
//                 location: body.location,
//                 salary: body.salary,
//                 datePosted: body.datePosted,
//             }
//         ]
//     });

//     console.log(result);
//     return res.status(201).json({ msg: "success" });
// };

// module.exports =  postProvider;




// const JobProvider = require("./model/jobprovider.model.js")

// export default postProvider = async(req, res) => {
//     const body = req.body;
//     if(!body || !body.name || !body.contactEmail || !body.contactPhone 
//         || !body.jobListings ||!body.jobId || !body.title || !body.description
//         || !body.location || !body.salary || !body.datePosted)
//         // || !jobType || !jobCategory || !jobStatus
//         {
//             return res.status(400).json({ message: "Invalid request" });
//         }
//      const result =await JobProvider.create({
//         name: body.name,
//         contactEmail: body.contactEmail,
//         contactPhone: body.contactPhone,
//         jobListings: [
//             {
//                 jobId: body.jobId,
//                 title: body.providerId,
//                 description: body.description,
//                 location: body.location,
//                 salary: body.salary,
//                 datePosted: body.datePosted
//             }
//         ]
//     });
//     console.log(result);
//     return res.status(201).json({msg: "success"});
    
// }