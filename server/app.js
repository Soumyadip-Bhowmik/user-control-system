require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');

const DB = "mongodb+srv://soumya:yROsj2TcDdBu2KB3@cluster0.0cbygew.mongodb.net/mernstack?retryWrites=true&w=majority&appName=Cluster0";
const port = process.env.PORT || 8003;
require("./db/conn");  // MongoDB connection
const users = require("./models/userSchema");  // Import user schema
const router = require("./routes/router");  // Import routes

app.use(cors());
app.use(express.json());
app.use(router);

// Serve static files from the React frontend
app.use(express.static(path.join(__dirname, '../client/build')));

// Catch-all for serving React frontend on unknown routes
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
