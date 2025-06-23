// frontend/src/pages/BlogEditor.tsx

import { useState } from "react";
import { useEffect } from "react";
import { marked } from "marked";

const API_BASE = import.meta.env.VITE_API_BASE;

/**
 * BlogEditor
 * ----------
 * Admin-only page for creating or editing a blog post.
 * Features controlled form inputs, submission feedback, and backend integration.
 */
export function BlogEditor() {
  // Controlled form state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  /**
   * statusMessage and statusType
   * ----------------------------
   * Provides real-time user feedback for submission status.
   * - statusType: "success" or "error"
   * - statusMessage: human-readable message for user
   */
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState<"success" | "error">("success");

  // Load draft from loacalStorage on initial mount
  useEffect(() => {
    const savedDraft = localStorage.getItem("blog-draft");
    if (savedDraft) {
      try {
        const { title, content } = JSON.parse(savedDraft);
        setTitle(title);
        setContent(content);
      } catch (err) {
        console.warn("Failed to parse saved draft:", err);
      }
    }
  }, []);

  // Save draft to localStorage on change
  useEffect(() => {
    const draft = JSON.stringify({ title, content });
    localStorage.setItem("blog-draft", draft);
  }, [title, content]);

  /**
   * handleSubmit
   * ------------
   * Validates the post content, submits to backend, and sets feedback state.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear any previous messages
    setStatusMessage("");

    if (!title.trim() || !content.trim()) {
      setStatusType("error");
      setStatusMessage("Both title and content are required.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/api/blogs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create blog post");
      }

      const data = await response.json();

      // Show success, clear form
      setStatusType("success");
      setStatusMessage(`Post "${data.title}" created successfully.`);
      setTitle("");
      setContent("");
    } catch (err: any) {
      console.error("Blog creation failed:", err.message);
      setStatusType("error");
      setStatusMessage(err.message);
    }
  };

  /**
   * applyFormat
   * -----------
   * Inserts markdown syntax at the selected text inside the content textarea.
   */
  function applyFormat(prefix: string, suffix: string) {
    const textarea = document.getElementById("content") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.slice(start, end);
    const newText = prefix + selectedText + suffix;

    const updated = content.slice(0, start) + newText + content.slice(end);
    setContent(updated);

    // Refocus the cursor after inserting text
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd =
        start + prefix.length + selectedText.length + suffix.length;
    }, 0);
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-10 text-white">
      <h1 className="mb-6 text-2xl font-bold text-teal-600">
        Create a New Blog Post
      </h1>

      {/* Feedback message */}
      {statusMessage && (
        <div
          className={`mb-6 rounded px-4 py-3 text-sm font-medium ${
            statusType === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {statusMessage}
        </div>
      )}

      {/* Toggle between Edit and Preview */}
      <div className="mb-4 flex justify-end">
        <button
          type="button"
          onClick={() => setShowPreview((prev) => !prev)}
          className="rounded bg-zinc-700 px-3 py-1 text-sm hover:bg-zinc-600"
        >
          {showPreview ? "Edit Mode" : "Preview Mode"}
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-lg bg-zinc-900 p-6 shadow-lg"
      >
        {/* Title */}
        <div>
          <label htmlFor="title" className="mb-1 block text-sm font-semibold">
            Title
          </label>
          <input
            id="title"
            type="text"
            className="border-zinc-70000 w-full rounded border bg-zinc-800 px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Content and Formatting */}
        <div>
          <label htmlFor="content" className="mb-1 block text-sm font-semibold">
            Content
          </label>

          {/* Formatting Buttons */}
          <div className="mb-2 flex gap-2">
            <button
              type="button"
              onClick={() => applyFormat("**", "**")}
              className="rounded bg-zinc-700 px-2 py-1 text-sm hover:bg-zinc-600"
            >
              Bold
            </button>
            <button
              type="button"
              onClick={() => applyFormat("_", "_")}
              className="rounded bg-zinc-700 px-2 py-1 text-sm hover:bg-zinc-600"
            >
              Italic
            </button>
            <button
              type="button"
              onClick={() => applyFormat("#", "")}
              className="rounded bg-zinc-700 px-2 py-1 text-sm hover:bg-zinc-600"
            >
              Heading
            </button>
          </div>

          {/* Textarea or Preview */}
          {showPreview ? (
            <div
              className="prose prose-invert min-h-[12rem] w-full max-w-none rounded border border-zinc-700 bg-zinc-800 px-3 py-4"
              dangerouslySetInnerHTML={{ __html: marked.parse(content || "") }}
            />
          ) : (
            <textarea
              id="content"
              className="h-48 w-full rounded border border-zinc-700 bg-zinc-800 px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
        >
          Publish Post
        </button>
      </form>
    </section>
  );
}
