import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Copy } from "lucide-react";
import api from "../api/client";
import { useAuth } from "../context/AuthContext";
import MessageCard from "../components/MessageCard";

export default function DashboardPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const profileLink = `${window.location.origin}/u/${user?.username || ""}`;

  const fetchMessages = async () => {
    try {
      const { data } = await api.get("/messages");
      setMessages(data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch inbox.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const unreadCount = useMemo(() => messages.filter((message) => !message.read).length, [messages]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/messages/${id}`);
      setMessages((prev) => prev.filter((message) => message._id !== id));
      toast.success("Message deleted.");
    } catch {
      toast.error("Failed to delete message.");
    }
  };

  const handleToggleRead = async (id) => {
    try {
      await api.patch(`/messages/${id}/read`);
      setMessages((prev) =>
        prev.map((message) =>
          message._id === id ? { ...message, read: !message.read } : message
        )
      );
    } catch {
      toast.error("Failed to update message.");
    }
  };

  const handleReact = async (id) => {
    try {
      const { data } = await api.patch(`/messages/${id}/react`);
      setMessages((prev) =>
        prev.map((message) => (message._id === id ? { ...message, likes: data.likes } : message))
      );
    } catch {
      toast.error("Failed to react.");
    }
  };

  const copyProfileLink = async () => {
    await navigator.clipboard.writeText(profileLink);
    toast.success("Profile link copied.");
  };

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8">
      <div className="mb-6 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5">
        <h2 className="text-2xl font-bold text-white">Your Inbox</h2>
        <p className="mt-1 text-sm text-zinc-400">
          {messages.length} messages • {unreadCount} unread
        </p>
        <button
          type="button"
          onClick={copyProfileLink}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-zinc-800 px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-700"
        >
          <Copy size={14} />
          Copy profile link
        </button>
      </div>

      {loading ? (
        <p className="text-zinc-400">Loading messages...</p>
      ) : messages.length === 0 ? (
        <p className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 text-zinc-400">
          No messages yet. Share your profile link to receive anonymous messages.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {messages.map((message) => (
            <MessageCard
              key={message._id}
              message={message}
              onDelete={handleDelete}
              onToggleRead={handleToggleRead}
              onReact={handleReact}
            />
          ))}
        </div>
      )}
    </section>
  );
}
