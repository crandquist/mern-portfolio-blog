import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * Represents a blog post returned from the backend.
 */
interface BlogPost {
    _id: string;
    title: string;
    content: string;
    createdAt: string;
}

/**
 * LatestPost
 * ----------
 * Fetches the most recent blog post and displays a teaser with a link.
 */
const LatestPost: React.FC = () => {
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const API_BASE = import.meta.env.VITE_API_BASE;
    console.log("API_BASE:", API_BASE);

    useEffect(() => {
        fetch(`${API_BASE}/api/blogs`)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Http error! status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            console.log("Fetched data:", data)
            if (data.length > 0) {
                setPost(data[0]);   // Assumes newest post is first
            }
            setLoading(false);
        })
        .catch((err) => {
            setError(err.message);
            setLoading(false);
        });
    }, []);

    if (loading) return <p>Loading latest blog post...</p>;
    if (error) return <p className="text-red-600">Error: {error}</p>;
    if (!post) return <p>No blog posts found.</p>;

    return (
        <section className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">{post.title}</h3>
            <p className="text-sm text-gray-500 mb-4">
                {new Date(post.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-800 mb-4">
                {post.content.slice(0, 150)}...
            </p>
            <Link to="/blog" className="text-blue-600 hover:underline">
                Continue reading →
            </Link>
        </section>
    );
};

export default LatestPost;