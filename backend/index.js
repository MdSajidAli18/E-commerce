// "Set up Express.js server with CORS, connected to MongoDB database using dotenv for environment variables, and established a dynamic port for server listening."

//  summarizes the main tasks performed in the code, which include:-
// (i) Setting up an Express.js server
// (ii) Enabling CORS (Cross-Origin Resource Sharing)
// (iii) Configuring environment variables using dotenv
// (iv) Establishing a default port for the server to listen on
//  (v) Connecting to a MongoDB database using the connectDB function
// (vi) Establishing a dynamic port for the server to listen on




const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const connectDB = require('./config/db')
const router = require('./routes')



const app = express()
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))
app.use(express.json({limit: '50mb'})) // limit is set for user profilePic.(I have resolved this issue.)
app.use(cookieParser())

app.use("/api", router)

const PORT = 8080 || Process.env.PORT;

connectDB()?.then(()=> {
    app.listen(PORT, () => {
        console.log("Server is running");
    });
});


