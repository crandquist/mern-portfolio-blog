// frontend/src/pages/BlogEditor.tsx

import { useState, useEffect } from "react";
import { marked } from "marked";

const API_BASE = import.meta.env.VITE_API_BASE;

/**
 * BlogEditor
 * ----------
 * Admin-only page for creating or editing a blog post.
 * Features controlled form inputs, submission feedback, and backend integration.
 */
export function BlogEditor() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState<"success" | "error">("success");

  // Load saved draft
  useEffect(() => {
    const saved = localStorage.getItem("blog-draft");
    if (saved) {
      try {
        const { title, content } = JSON.parse(saved);
        setTitle(title);
        setContent(content);
      } catch (err) {
        console.warn("Draft restore failed:", err);
      }
    }
  }, []);

  // Save to draft
  useEffect(() => {
    localStorage.setItem("blog-draft", JSON.stringify({ title, content }));
  }, [title, content]);

  // Submit blog post to backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage("");

    if (!title.trim() || !content.trim()) {
      setStatusType("error");
      setStatusMessage("Both title and content are required.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/blogs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to create blog post");
      }

      const data = await res.json();
      setStatusType("success");
      setStatusMessage(`Post "${data.title}" created successfully.`);
      setTitle("");
      setContent("");
    } catch (err: any) {
      setStatusType("error");
      setStatusMessage(err.message);
    }
  };

  // Apply markdown-style formatting around selected content
  const applyFormat = (prefix: string, suffix: string) => {
    const textarea = document.getElementById("content") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.slice(start, end);
    const updated =
      content.slice(0, start) + prefix + selected + suffix + content.slice(end);

    setContent(updated);

    // Restore cursor position after formatting
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd =
        start + prefix.length + selected.length + suffix.length;
    }, 0);
  };

  return (
    <section className="mx-auto max-w-3xl px-4 py-12 text-white">
      {/* Page Title */}
      <h1 className="mb-8 text-3xl font-bold text-teal-400">
        Create a New Blog Post
      </h1>

      {/* Status Feedback */}
      {statusMessage && (
        <div
          className={`mb-6 rounded-md px-4 py-3 text-sm font-medium ${
            statusType === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {statusMessage}
        </div>
      )}

      {/* Toggle Preview Mode */}
      <div className="mb-4 flex justify-end">
        <button
          type="button"
          onClick={() => setShowPreview((prev) => !prev)}
          className="rounded-md bg-zinc-700 px-3 py-1.5 text-sm text-white transition hover:bg-zinc-600"
        >
          {showPreview ? "Edit Mode" : "Preview Mode"}
        </button>
      </div>

      {/* Blog Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-lg bg-zinc-900 p-6 shadow-lg"
      >
        {/* Title Field */}
        <div>
          <label
            htmlFor="title"
            className="mb-1 block text-sm font-semibold text-zinc-200"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-400 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:outline-none"
            required
          />
        </div>

        {/* Content Editor */}
        <div>
          <label
            htmlFor="content"
            className="mb-1 block text-sm font-semibold text-zinc-200"
          >
            Content
          </label>

          {/* Markdown formatting buttons */}
          <div className="mb-2 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => applyFormat("**", "**")}
              className="rounded-md bg-zinc-700 px-2 py-1 text-sm text-white transition hover:bg-zinc-600"
            >
              Bold
            </button>
            <button
              type="button"
              onClick={() => applyFormat("_", "_")}
              className="rounded-md bg-zinc-700 px-2 py-1 text-sm text-white transition hover:bg-zinc-600"
            >
              Italic
            </button>
            <button
              type="button"
              onClick={() => applyFormat("# ", "")}
              className="rounded-md bg-zinc-700 px-2 py-1 text-sm text-white transition hover:bg-zinc-600"
            >
              Heading
            </button>
          </div>

          {/* Content Field or Markdown Preview */}
          {showPreview ? (
            <div
              className="prose prose-invert min-h-[12rem] w-full max-w-none rounded-md border border-zinc-700 bg-zinc-800 px-4 py-4"
              dangerouslySetInnerHTML={{ __html: marked.parse(content || "") }}
            />
          ) : (
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="h-48 w-full resize-y rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-400 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:outline-none"
              required
            />
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="rounded-md bg-teal-600 px-5 py-2 font-semibold text-white transition hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:outline-none"
        >
          Publish Post
        </button>
      </form>
    </section>
  );
}
