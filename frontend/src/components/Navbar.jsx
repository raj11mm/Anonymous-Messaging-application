import { Link, NavLink } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ darkMode, toggleDarkMode }) {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <header className="sticky top-0 z-10 border-b border-zinc-800/70 bg-zinc-950/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-lg font-bold tracking-tight text-fuchsia-400">
          WhisperBox
        </Link>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleDarkMode}
            className="rounded-full border border-zinc-700 p-2 text-zinc-100 transition hover:bg-zinc-800"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {isAuthenticated ? (
            <>
              <NavLink to="/dashboard" className="text-sm text-zinc-300 hover:text-white">
                Dashboard
              </NavLink>
              <span className="hidden text-xs text-zinc-500 sm:block">@{user?.username}</span>
              <button
                type="button"
                onClick={logout}
                className="rounded-xl bg-zinc-800 px-3 py-2 text-sm text-zinc-200 transition hover:bg-zinc-700"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/auth" className="text-sm text-zinc-300 hover:text-white">
              Login
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
}
