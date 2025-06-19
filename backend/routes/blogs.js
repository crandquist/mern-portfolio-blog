// routes/blogs.js
// ---------------------------------------------------------
// Route handler for all `/api/blogs` endpoints.
// Responsible for reading BlogPost data from MongoDB
// and returning it as JSON to the client.
// ---------------------------------------------------------

const express = require('express');
const BlogPost = require('../models/BlogPost'); // Mongoose model

// Create a router instance - keeps routes modular
const router = express.Router();

/**
 * @route   GET /api/blogs
 * @desc    Retrieve all blog posts (newest first)
 * @access  Public
 */
router.get('/', async (req, res) => {
    try {
        // Query the database for ever BlogPost, sorted by creation date
        const posts = await BlogPost.find().sort({ createdAt: -1 });

        // Respond with JSON array of blog posts
        res.json(posts);
    } catch (err) {
        // Log server error & send a generic message to the client
        console.error('Error fetching blog posts:', err.message);
        res.status(500).json({message: 'Server error retrieving posts'});
    }
});

// Export the router so it can be mounted in server.js
module.exports = router;