import { motion } from "framer-motion";
import { Heart, Trash2, MailOpen, Mail } from "lucide-react";

const formatDate = (iso) =>
  new Date(iso).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

export default function MessageCard({ message, onDelete, onToggleRead, onReact }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl border p-4 ${
        message.read
          ? "border-zinc-700 bg-zinc-900/40"
          : "border-fuchsia-500/40 bg-fuchsia-500/5"
      }`}
    >
      <p className="whitespace-pre-wrap text-sm leading-relaxed text-zinc-200">{message.content}</p>
      <p className="mt-3 text-xs text-zinc-500">{formatDate(message.createdAt)}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onToggleRead(message._id)}
          className="inline-flex items-center gap-1 rounded-lg bg-zinc-800 px-3 py-1.5 text-xs text-zinc-200 hover:bg-zinc-700"
        >
          {message.read ? <Mail size={14} /> : <MailOpen size={14} />}
          {message.read ? "Mark unread" : "Mark read"}
        </button>

        <button
          type="button"
          onClick={() => onReact(message._id)}
          className="inline-flex items-center gap-1 rounded-lg bg-zinc-800 px-3 py-1.5 text-xs text-zinc-200 hover:bg-zinc-700"
        >
          <Heart size={14} />
          React ({message.likes})
        </button>

        <button
          type="button"
          onClick={() => onDelete(message._id)}
          className="inline-flex items-center gap-1 rounded-lg bg-rose-600/80 px-3 py-1.5 text-xs text-white hover:bg-rose-600"
        >
          <Trash2 size={14} />
          Delete
        </button>
      </div>
    </motion.article>
  );
}
