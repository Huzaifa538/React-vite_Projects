import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import AuthForm from "./components/AuthForm";
import DonorList from "./components/DonorList";
import GainerList from "./components/GainerList";
import Profile from "./components/Profile";
import { ThemeProvider } from "./context/ThemeProvider"; // ✅ Add ThemeProvider
import ThemeToggle from "./components/ThemeToggle"; // ✅ Toggle button component

function App() {
  const [user, setUser] = useState(null);

  // ✅ Load user from localStorage
  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) setUser(JSON.parse(currentUser));
  }, []);

  return (
    // ✅ Wrap entire app inside ThemeProvider
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-500">
        {/* Navbar */}
        <Navbar />

        {/* Top-right Theme Toggle */}
        <div className="absolute top-4 right-6">
          <ThemeToggle />
        </div>

        {/* Hero Section */}
        <Hero />

        {/* Stats Section */}
        <Stats />

        {/* Conditional Auth/Profile */}
        <div className="px-6">
          {user ? <Profile /> : <AuthForm setUser={setUser} />}
        </div>

        {/* Donor and Gainer Lists */}
        <div className="px-6">
          <DonorList />
          <GainerList />
        </div>

        {/* Footer */}
        <footer className="py-8 text-center text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 mt-8">
          © {new Date().getFullYear()} <span className="font-semibold text-red-500">BloodBridge</span> – Saving Lives, One Drop at a Time 
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
