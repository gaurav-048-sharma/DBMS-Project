// controllers/jobprovider.controller.js
const JobProvider = require('../model/jobprovider.model.js');
const JobSeeker = require("../model/jobseeker.model.js");

module.exports.dashbaord = async(req, res) => {
    const routes = await JobProvider.find({});
    res.render("./jobprovider/providerdashboard.ejs", {routes});
}
module.exports.newprovider = (req, res) => {
    res.render("./jobprovider/providernew.ejs");
}
module.exports.show = async(req, res) => {
    const {id} = req.params;
    const routes = await JobProvider.findById(id);
    res.render("./jobprovider/providershow.ejs",{routes});
}
module.exports.postProvider = async (req, res) => {
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
        res.redirect("/api/providers")
        // return res.status(201).json({ message: "Job provider created successfully", data: result });
    } catch (error) {
        console.error("Error creating job provider:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};


module.exports.editproviders = async(req,res) => {
    const {id} = req.params;
    const routes = await JobProvider.findById(id);
    res.render("./jobprovider/provideredit.ejs", {routes});
}


module.exports.updateProviders = async (req, res) => {
        const { id } = req.params;
        const { name, contactEmail, contactPhone, jobListings } = req.body;
    
        
            const updatedProvider = await JobProvider.findByIdAndUpdate(id, {...req.body});
    
            if (!updatedProvider) {
                return res.status(404).json({ message: "Provider not found" });
            }
    
            res.redirect(`/api/providers/${id}`);
          
    };
module.exports.confirmDeleteProvider = async (req, res) => {
        const { id } = req.params;
        const routes = await JobProvider.findById(id);
        if (!routes) {
            return res.status(404).json({ message: "Provider not found" });
        }
        res.render("./jobprovider/confirmProviderDelete.ejs", { routes });
    };
module.exports.deleteProviders = async(req, res) => {
    const { id } = req.params;
    let deletedProvider = await JobProvider.findByIdAndDelete(id);
    res.redirect("/api/providers");

}


module.exports.getSeekers = async(req, res) => {
    try {
        const { providerId } = req.params;

        // Find all job seekers who have applied to this provider's jobs
        const jobSeekers = await JobSeeker.find({
            'appliedJobs.providerId': providerId
        });

        // Pass jobSeekers data to the EJS template
        res.render('./jobprovider/provideseeker.ejs', { jobSeekers });
    } catch (error) {
        console.error("Error retrieving job seekers:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}
    









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