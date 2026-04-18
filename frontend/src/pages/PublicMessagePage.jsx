import { useState } from "react";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import toast from "react-hot-toast";
import api from "../api/client";

export default function PublicMessagePage() {
  const { username } = useParams();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const sanitized = DOMPurify.sanitize(content.trim());
      await api.post(`/messages/${username}`, { content: sanitized });
      toast.success("Anonymous message sent.");
      setContent("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-xl px-4 py-12">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6">
        <h2 className="text-2xl font-bold text-white">Send anonymous message to @{username}</h2>
        <p className="mt-2 text-sm text-zinc-400">
          Be respectful. This is anonymous, but abuse is filtered and rate limited.
        </p>
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <textarea
            required
            maxLength={500}
            rows={6}
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Type your anonymous message..."
            className="w-full resize-none rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-fuchsia-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-fuchsia-500 px-4 py-3 font-semibold text-white transition hover:bg-fuchsia-400 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
}
