// frontend/src/pages/BlogEditor.tsx

import { useState } from 'react';
import { marked } from 'marked';

const API_BASE = import.meta.env.VITE_API_BASE;

/**
 * BlogEditor
 * ----------
 * Admin-only page for creating or editing a blog post.
 * Features controlled form inputs, submission feedback, and backend integration.
 */
export function BlogEditor() {
  // Controlled form state
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [content, setContent] = useState('');

  /**
   * statusMessage and statusType
   * ----------------------------
   * Provides real-time user feedback for submission status.
   * - statusType: "success" or "error"
   * - statusMessage: human-readable message for user
   */
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState<'success' | 'error'>('success');

  /**
   * handleSubmit
   * ------------
   * Validates the post content, submits to backend, and sets feedback state.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear any previous messages
    setStatusMessage('');

    if (!title.trim() || !content.trim()) {
      setStatusType('error');
      setStatusMessage('Both title and content are required.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/api/blogs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create blog post');
      }

      const data = await response.json();

      // Show success, clear form
      setStatusType('success');
      setStatusMessage(`Post "${data.title}" created successfully.`);
      setTitle('');
      setContent('');
    } catch (err: any) {
      console.error('Blog creation failed:', err.message);
      setStatusType('error');
      setStatusMessage(err.message);
    }
  };

  return (
    <section className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Create a New Blog Post</h1>

      {/* Feedback message */}
      {statusMessage && (
        <div
          className={`mb-6 px-4 py-3 rounded text-sm font-medium ${
            statusType === 'success'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {statusMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block font-medium mb-1">Title</label>
          <input
            id="title"
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Content */}
        <div>
          <label htmlFor="content" className="block font-medium mb-1">Content</label>
          <textarea
            id="content"
            className="w-full border border-gray-300 rounded px-3 py-2 h-48"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white font-medium px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Publish Post
        </button>
      </form>
      
      {/* Markdown Preview */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-2">Live Preview</h2>
        <div
            className="prose prose-sm max-w-none bg-gray-50 border rounded p-4"
            dangerouslySetInnerHTML={{ __html: marked.parse(content || '') }}
        />
      </div>
    </section>
  );
}
