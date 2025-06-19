import React from 'react';
import { useEffect, useState } from 'react';

/**
 * Represents a blog post fetched from the backend API.
 */
interface BlogPost {
    _id: string;
    title: string;
    body: string;
    createdAt: string;
}

/**
 * BlogList
 * --------
 * Fetches and displays all blog posts from the API.
 */
const BlogList: React.FC = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const API_BASE = import.meta.env.VITE_API_BASE;

    // Fetch blog posts from API on component mount
    useEffect(() => {
        fetch(`${API_BASE}/posts`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                setPosts(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return (
        <section className="max-w-3xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">Blog Posts</h2>
            
            {/* Loading state */}
            {loading && <p className="text-gray-500">Loading posts...</p>}

            {/* Error state */}
            {error && <p className="text-red-600">Error: {error}</p>}

            {/* Posts list */} 
            <ul className="space-y-6">
                {posts.map((post) => (
                    <li key={post._id} className="borderr rounded-lg p-4 shadow-sm bg-white">
                        <h3 className="text-xl font-semibold mb-1">{post.title}</h3>
                        <p className="text-sm text-gray-500 mb-2">
                            {new Date(post.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-gray-700 line-clamp-3">{post.body}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default BlogList;