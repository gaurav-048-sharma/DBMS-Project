
const mongoose = require("mongoose");

const connectToMongoDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/JobPortal", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Connected to MongoDB');
    }catch(error) {
        console.log('Error connecting to MongoDB:', error);
    }
};

module.exports =  connectToMongoDB;