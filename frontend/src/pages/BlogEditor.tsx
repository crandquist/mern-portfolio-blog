import { useState } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE;

/**
 * BlogEditor
 * ----------
 * Admin-only interface for creating new blog posts.
 * Handles form input, submission to backend, and feedback messaging.
 */
export function BlogEditor() {
    // State for form input fields
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // State for feedback messages
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    /**
     * Submits the blog post form to the backend API.
     * Validates fields and handles server response.
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Reset previous feedback
        setSuccessMessage('');
        setErrorMessage('');

        // Validate inputs
        if (!title.trim || !content.trim()) {
            setErrorMessage('Both title and content are required.');
            return;
        }

        try{
            const response = await fetch(`${API_BASE}/api/blogs`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ title, content }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create blog post');
            }

            const data = await response.json();
            setSuccessMessage(`Post "${data.title}" created successfully.`);
            setTitle('');
            setContent('');
        } catch (err: any) {
            console.error('Blog creation failed:', err.message);
            setErrorMessage(err.message);
        }
    };

    return (
        <section className="max-w-3xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">Create a New Blog Post</h2>

            {/* Feedback UI */}
            {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}
            {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}

            {/* Post creation form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block font-medium mb-`">Title</label>
                    <input
                        id="title"
                        type="text"
                        className="w-full border rounded p-2"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="content" className="block font-medium mb-1">Content</label>
                    <textarea
                        id="content"
                        className="w-full border rounded p-2 h-48"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Publish Post
                </button>
            </form>
        </section>
    );
}