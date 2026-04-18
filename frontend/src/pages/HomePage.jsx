import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-4 py-14">
      <motion.h1
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl text-4xl font-black leading-tight text-white sm:text-6xl"
      >
        Receive brutally honest messages. Stay anonymous. Keep it fun.
      </motion.h1>
      <p className="max-w-xl text-zinc-300">
        Create your profile link, share it anywhere, and receive anonymous messages in your
        private dashboard.
      </p>
      <div className="flex gap-3">
        <Link
          to="/auth"
          className="rounded-xl bg-fuchsia-500 px-5 py-3 font-semibold text-white transition hover:bg-fuchsia-400"
        >
          Start Now
        </Link>
        <Link
          to="/dashboard"
          className="rounded-xl border border-zinc-700 px-5 py-3 font-semibold text-zinc-200 hover:bg-zinc-800"
        >
          Open Dashboard
        </Link>
      </div>
    </section>
  );
}
