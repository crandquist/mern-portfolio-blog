// Import Mongoose to define a schema and model
const mongoose = require('mongoose');

// Define the structure of a blog post using a Mongoosse schema
const BlogPostSchema = new mongoose.Schema({
    title: {
        type: String,           // Title must be a string
        required: true,         // Title is required
        trim: true              // Remove leading/trailing whitespace
    },
    content: {
        type: String,           // Main body of the blog post
        required: true          
    },
    createdAt: {
        type: Date,
        default: Date.now      // Automatically set to current date/time
    }
});

// Create a Mongoose model based on the schema
const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

// Export the model so it can be imported in routes or controllers
module.exports = BlogPost;