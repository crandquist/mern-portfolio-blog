import React from 'react';

/**
 * BlogList
 * --------
 * Displays a list of blog posts fetched from the backend.
 */
const BlogList: React.FC = () => {
    return (
        <section className="max-w-3xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">Blog Posts</h2>
            {/* Blog posts will go here */}
        </section>
    );
};

export default BlogList;