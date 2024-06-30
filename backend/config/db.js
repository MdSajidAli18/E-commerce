// Implemented database connection using Mongoose, established a connection to MongoDB via MONGODB_URI environment variable, and logged connection status.



const mongoose = require("mongoose");


async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to DB");
    } catch (err) {
        console.log(err);
    };
};

module.exports = connectDB;