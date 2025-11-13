import { useState, useEffect } from "react";
import BookSection from "../Components/BookSection";
import CustomerSection from "../Components/CustomerSection";
import { BookOpen, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [tab, setTab] = useState("books");
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) navigate("/login");
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white flex flex-col items-center px-6 py-10">

      {/* Header */}
      <div className="flex justify-between w-full max-w-5xl items-center mb-10">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl md:text-5xl font-extrabold text-cyan-400"
        >
          📚 Bookstore Management
        </motion.h1>

        <button
          onClick={logout}
          className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-8 bg-slate-800/50 p-2 rounded-full backdrop-blur-md border border-slate-700/60 shadow-lg">
        <button
          onClick={() => setTab("books")}
          className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium transition-all ${
            tab === "books"
              ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md"
              : "bg-transparent hover:bg-slate-700/60 text-slate-300"
          }`}
        >
          <BookOpen size={18} />
          Books
        </button>

        <button
          onClick={() => setTab("customers")}
          className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium transition-all ${
            tab === "customers"
              ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md"
              : "bg-transparent hover:bg-slate-700/60 text-slate-300"
          }`}
        >
          <Users size={18} />
          
          Customers
        </button>
      </div>

      {/* Content */}
      <motion.div
        key={tab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-5xl bg-slate-900/60 p-8 rounded-2xl border border-slate-700/70 backdrop-blur-xl shadow-2xl"
      >
        {tab === "books" ? <BookSection /> : <CustomerSection />}
      </motion.div>
    </div>
  );
}
