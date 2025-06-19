// Load required packages (CommonJS)
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')

// Import the blogs router
const blogRoutes = require('./routes/blogs');

// Load variables from .env into process.env
dotenv.config();

//Initialize an Express app instance
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Mount blog routes under /api/blogs
app.use('/api/blogs', blogRoutes);

// Root route for basic sanity check
app.get('/', (req, res) => {
    res.send('API is running!')
});

// Get the MongoDB connection string from environment variables
const mongoURI = process.env.MONGO_URI;

// Attempt to connect to MongoDB using Mongoose
mongoose.connect(mongoURI)
    .then(() => {
        console.log('MongoDB connected!');

        // Once DB is connected, start the server
        const port = process.env.PORT || 5000;
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    })
    .catch((err) => {
        // If connection fails, log the error
        console.error('MongoDB connection error:', err.message);
    });