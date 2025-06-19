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

/**
 * @route POST /api/blogs
 * @desc Create a new blog post
 * @access Public (can restrict later with auth)
 */
router.post('/', async (req, res) => {
    // Destructure fields from the request body
    const { title, content } = req.body;

    // Input validation - ensure both fields are present
    if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required.' });
    }

    try {
        // Create a new instance of the BlogPost model
        const newPost = new BlogPost({
            title: title.trim(),
            content
        });

        // Save the post to MongoDB
        const savedPost = await newPost.save();

        // Return the newly created post
        res.status(201).json(savedPost);
    } catch (err) {
        console.error('Error creating blog post:', err.message);
        res.status(500).json({message: 'Server error creating blog post' });
    }
});

/**
 * @route POST /api/blogs/seed
 * @desc Delete all blog posts and insert sample data
 * @access Development only
 */
router.post('/seed', async (req, res) => {
    // Prevent this route from running in production
    if (process.env.NODE_ENV !== 'development') {
        return res.status(403).json({message: 'Forbidden: seed route is disabled in production'});
    }
    
    try {
        // Delete all existing blog posts
        await BlogPost.deleteMany();

        // Insert multiple predefined posts
        const seededPosts = await BlogPost.insertMany([
            {
                title: 'Getting Started with My Portfolio',
                content: 'Welcome! This is a demo post seeded into the database.',
            },
            {
                title: 'What I Learned Building a MERN App',
                content: 'Full-stack development with MongoDB, Express, React, and Node.js.',
            },
            {
                title: 'Why I Love TypeScript',
                content: 'Type safety, editor support, and predictable code make TypeScript great.',
            }
        ]);

        // Return the newly created posts
        res.status(201).json(seededPosts);
    } catch (err) {
        console.error('Error seeding blog posts:', err.message);
        res.status(500).json({ message: 'Failed to seed blog posts' });
    }
});

// Export the router so it can be mounted in server.js
module.exports = router;