const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/Tasks");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
    }
};

module.exports = connectDB;