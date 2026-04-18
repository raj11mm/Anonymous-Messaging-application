import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/client";
import { useAuth } from "../context/AuthContext";

export default function AuthPage() {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const endpoint = mode === "login" ? "/auth/login" : "/auth/register";
      const payload =
        mode === "login"
          ? { email: form.email, password: form.password }
          : {
              username: form.username.trim().toLowerCase(),
              email: form.email.trim().toLowerCase(),
              password: form.password,
            };
      const { data } = await api.post(endpoint, payload);
      auth.login(data);
      toast.success(`${mode === "login" ? "Welcome back" : "Account created"} successfully.`);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-md px-4 py-10">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6">
        <h2 className="text-2xl font-bold text-white">
          {mode === "login" ? "Login to your inbox" : "Create your account"}
        </h2>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {mode === "register" && (
            <input
              required
              value={form.username}
              onChange={(event) => setForm({ ...form, username: event.target.value })}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-fuchsia-500"
              placeholder="Username"
            />
          )}
          <input
            required
            type="email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-fuchsia-500"
            placeholder="Email"
          />
          <input
            required
            type="password"
            minLength={6}
            value={form.password}
            onChange={(event) => setForm({ ...form, password: event.target.value })}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-fuchsia-500"
            placeholder="Password"
          />

          <button
            disabled={loading}
            className="w-full rounded-xl bg-fuchsia-500 px-4 py-3 font-semibold text-white hover:bg-fuchsia-400 disabled:opacity-50"
          >
            {loading ? "Please wait..." : mode === "login" ? "Login" : "Register"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => setMode(mode === "login" ? "register" : "login")}
          className="mt-4 text-sm text-fuchsia-400 hover:text-fuchsia-300"
        >
          {mode === "login" ? "Need an account? Register" : "Already have one? Login"}
        </button>
      </div>
    </section>
  );
}
