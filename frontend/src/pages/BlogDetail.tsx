import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Base API URL for fetching blog posts
const API_BASE = import.meta.env.VITE_API_BASE

/**
 * Interface for the structure of a blog post object.
 */
interface BlogPost {
    _id: string;
    title: string;
    content: string;
    createdAt: string;
}

/**
 * BlogDetail
 * ----------api/blogs/${id}
 * Fetches and displays a single blog post based on the ID from the route.
 * Implements loading and error states for a smooth user experience.
 */
export function BlogDetail() {
    // Extract blog ID from route parameters
    const { id } = useParams();

    // Local state for post data, loading, and error tracking
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    /**
     * Fetch blog post data from the API on component mount or when 'id' changes.
     */
    useEffect(() => {
    fetch(`${API_BASE}/api/blogs/${id}`)
        .then((res) => {
            if (!res.ok) throw new Error('Failed to fetch blog post.');
            return res.json();
        })
        .then((data: BlogPost) => {
            setPost(data);
        })
        .catch((err: Error) => {
            console.error('Error fetching blog post:', err);
            setError(err.message); 
        })
        .finally(() => {
            setLoading(false);
        });
    }, [id]);


    // Display loading state
    if (loading) return <p>Loading blog post...</p>;

    // Display error state
    if (error) return <p>Error: {error}</p>;

    // If post is null (unexpected), render nothing
    if (!post) return null;

    // Render the blog post content
    return (
        <div className="blog-detail">
            <h1>{post.title}</h1>
            <p><em>{new Date(post.createdAt).toLocaleDateString()}</em></p>
            <article>{post.content}</article>
        </div>
    );
}