import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import PublicMessagePage from "./pages/PublicMessagePage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") !== "light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 transition-colors dark:bg-zinc-950 dark:text-zinc-100">
      <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode((prev) => !prev)} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route path="/u/:username" element={<PublicMessagePage />} />
        </Routes>
      </main>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
