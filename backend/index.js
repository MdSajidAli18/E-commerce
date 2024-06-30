// Set up Express.js server with CORS enabled, configured environment variables, and established a default port for server listening.

//  summarizes the main tasks performed in the code, which include:-
// (i) Setting up an Express.js server
// (ii) Enabling CORS (Cross-Origin Resource Sharing)
// (iii) Configuring environment variables using dotenv
// (iv) Establishing a default port for the server to listen on




const express = require('express');
const cors = require('cors');
require('dotenv').config();


const app = express();
app.use(cors());

const PORT = 8080 || ProcessingInstruction.env.PORT;

app.listen(PORT, () => {
    console.log("Server is running");
});