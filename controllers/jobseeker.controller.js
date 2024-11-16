const mongoose = require("mongoose");
const JobSeeker = require("../model/jobseeker.model.js");
const JobProvider = require('../model/jobprovider.model.js');
// module.exports.dashbaord = async(req, res) => {
//     const routes = await JobProvider.find({});
//     res.render("./jobprovider/providerdashboard.ejs", {routes});
// }
module.exports.seekerdashboard = async(req, res) => {
    // const routes = await JobProvider.find({});
    // res.render("./jobseeker/seekerdashboard.ejs" , {routes});
    
    const routes = await JobProvider.find({}).populate('jobListings').exec();
    const seekerRoutes = await JobSeeker.find({})
    if (!routes || routes.length === 0) {
        return res.status(404).send('No job listings or providers found.');
    }

    // Prepare data to pass to the EJS template
    // Flattening job listings to include providerId for each listing
    const jobListings = routes.flatMap(provider =>
        provider.jobListings.map(listing => ({
            ...listing.toObject(),
            providerId: provider.providerId, // Add providerId to each listing
            providerName: provider.name,
            // routeName: '/api/seekers/apply' // Pass route name as dynamic data
        }))
    );

    res.render("./jobseeker/seekerdashboard.ejs", {jobListings, seekerRoutes});

}
module.exports.newSeeker = async(req, res) => {
    // const provider = await JobProvider.findOne().populate('jobListings').exec();

    // if (!provider || provider.jobListings.length === 0) {
    //     return res.status(404).send('No job listings or providers found.');
    // }

    // const routes = await JobProvider.find().populate('jobListings').exec();

    // if (!routes || routes.length === 0) {
    //     return res.status(404).send('No job listings or providers found.');
    // }

    // // Flatten all job listings with their corresponding providerId
    // const jobListings = routes.flatMap(provider => 
    //     provider.jobListings.map(listing => ({
    //         ...listing.toObject(),
    //         providerId: provider.providerId // Add providerId to each listing
    //     }))
    // );

    // res.render("./jobseeker/seekernew.ejs", { jobListings });


    // const { providerId } = req.query;

    // if (!providerId) {
    //     return res.status(400).send('Provider ID is required.');
    // }

    // // Render the application form or handle the application logic here
    // res.send(`Applying to job with provider ID: ${providerId}`);
    const routes = await JobProvider.find({});
    if (!routes ) {
        return res.status(404).send('No job listings or providers found.');
    }
    const { providerId } = req.query;

    if (!providerId) {
        return res.status(400).send('Provider ID is required.');
    }

    // Handle application logic here (e.g., save to database, etc.)
    // res.send(`You have applied to the job with provider ID: ${providerId}`);
    res.render("./jobseeker/seekernew.ejs",{
            routes: {
                // jobId: jobId,
                providerId: providerId
            }
        });
    // const routes = await JobProvider.findOne({});
    // if (!routes ) {
    //     return res.status(404).send('No job listings or providers found.');
    // }
    // // const jobId = routes.jobListings[0].jobId; // Use the first job listing's ID
    // const providerId = routes.providerId; // Use the provider's ID
    // res.render("./jobseeker/seekernew.ejs",{
    //     routes: {
    //         // jobId: jobId,
    //         providerId: providerId
    //     }
    // });
}

module.exports.Seekercreate = async (req, res) => {
    const { name, email, phone, skills, appliedJobs } = req.body;

    // Validate required fields
    if(!Array.isArray(appliedJobs) || appliedJobs.length === 0) console.log("Missing or empty: appliedJobs");
    if (!name || !email || !phone || !skills || !Array.isArray(appliedJobs)) {
        return res.status(400).json({ message: "Invalid request: Missing required fields" });
    }

    //validate each job listing
    for( const [index, listing] of appliedJobs.entries()) {
        // if(!listing.jobId) console.log(`missing jobID[${index}].jobId`);
        if(!listing.providerId) console.log(`missing providerId[${index}].providerId`);

        if(!listing.providerId) {
            return res.status(400).json({ message: `Invalid request: Missing required fields in applied`});
        }
    }

    try {
        const newJobSeeker = new JobSeeker({
            name,
            email,
            phone,
            skills,
            appliedJobs,
        });
        
        await newJobSeeker.save();
        // return res.status(201).json({ message: "Job seeker created successfully", data: result });
        res.redirect("/api/seekers");
    } catch (error) {
        console.error("Error creating job seeker:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports.showSeekers = async(req, res) => {
    const routes = await JobSeeker.find({});
    res.render("./jobseeker/seekerloop.ejs", {routes});
}
module.exports.seekerApplicants = async(req, res) => {
    const {id} = req.params;
    const routes = await JobSeeker.findById(id);
    res.render("./jobseeker/seekershow.ejs",{routes});
    // const id = req.params.id;
    // JobSeeker.findById(id).then(async(jobseeker) => {
    //     if (!jobseeker) {
    //         return res.status(404).json({ message: "Job seeker not found" });
    //     }
    //     const applicants = await JobProvider.find({ jobseekerId: id });
    //     // res.json(applicants);
    //     res.render("./jobseeker/seekershow.ejs" , {applicants});
    // })
    
}

module.exports.editseekers = async(req,res) => {
    const {id} = req.params;
    const routes = await JobSeeker.findById(id);
    res.render("./jobseeker/seekeredit.ejs", {routes});
}
module.exports.updateSeekers = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, skills } = req.body;

    
        const updatedSeeker = await JobSeeker.findByIdAndUpdate(id, {...req.body});

        if (!updatedSeeker) {
            return res.status(404).json({ message: "Provider not found" });
        }

        res.redirect(`/api/seekers/show/${id}`);
      
};

module.exports.deleteSeekers = async(req, res) => {
    const { id } = req.params;
    let deletedSeekers = await JobSeeker.findByIdAndDelete(id);
    res.redirect("/api/seekers");
}





// const mongoose = require("mongoose");
// const JobSeeker = require("../model/jobseeker.model.js");

// const createJobSeeker = async (req, res) => {
//     const { name, email, phone, skills, appliedJobs } = req.body;

//     // Validate required fields
//     if (!name || !email || !phone || !skills || !Array.isArray(appliedJobs)) {
//         return res.status(400).json({ message: "Invalid request: Missing required fields" });
//     }

//     // Convert jobId and providerId to ObjectId in each applied job
//     const processedAppliedJobs = appliedJobs.map(job => {
//         return {
//             ...job,
//             jobId: mongoose.Types.ObjectId(job.jobId),
//             providerId: mongoose.Types.ObjectId(job.providerId),
//             dateApplied: job.dateApplied ? new Date(job.dateApplied) : new Date(),  // Set default date if not provided
//             status: job.status || "Applied"  // Default status if not provided
//         };
//     });

//     try {
//         const newJobSeeker = new JobSeeker({
//             name,
//             email,
//             phone,
//             skills,
//             appliedJobs: processedAppliedJobs
//         });

//         const result = await newJobSeeker.save();
//         return res.status(201).json({ message: "Job seeker created successfully", data: result });
//     } catch (error) {
//         console.error("Error creating job seeker:", error);
//         return res.status(500).json({ message: "Server error", error: error.message });
//     }
// };

// module.exports = createJobSeeker ;







// // controllers/jobseeker.controller.js
// const JobSeeker = require('../model/jobseeker.model.js');

// const createJobSeeker = async (req, res) => {
//     const { name, email, phone, skills, appliedJobs } = req.body;

//     // Validate top-level fields
//     if (!name || !email || !phone || !Array.isArray(appliedJobs)) {
//         return res.status(400).json({ message: "Invalid request: Missing required fields" });
//     }

//     // Validate each job application in appliedJobs
//     for (const application of appliedJobs) {
//         if (!application.jobId || !application.providerId) {
//             return res.status(400).json({ message: "Invalid request: Missing required fields in job application" });
//         }
//     }

//     try {
//         const newSeeker = new JobSeeker({
//             name,
//             email,
//             phone,
//             skills,
//             appliedJobs
//         });

//         const result = await newSeeker.save();
//         return res.status(201).json({ message: "Job seeker created successfully", data: result });
//     } catch (error) {
//         return res.status(500).json({ message: "Server error", error: error.message });
//     }
// };

// module.exports =createJobSeeker;
