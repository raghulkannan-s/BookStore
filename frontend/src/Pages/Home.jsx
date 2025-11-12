import { useState } from "react";
import BookSection from "../Components/BookSection";
import CustomerSection from "../Components/CustomerSection";
import { BookOpen, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [tab, setTab] = useState("books");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white flex flex-col items-center px-6 py-10">
      {/* Title */}
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-4xl md:text-5xl font-extrabold mb-10  text-cyan-400"
      >
        📚 Bookstore Management Dashboard
      </motion.h1>

      {/* Tabs */}
      <div className="flex space-x-4 mb-8 bg-slate-800/50 p-2 rounded-full backdrop-blur-md border border-slate-700/60 shadow-lg shadow-blue-500/10">
        <button
          onClick={() => setTab("books")}
          className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium transition-all ${
            tab === "books"
              ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md shadow-blue-500/30"
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
              ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md shadow-blue-500/30"
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
        className="w-full max-w-5xl bg-slate-900/60 p-8 rounded-2xl border border-slate-700/70 backdrop-blur-xl shadow-2xl shadow-blue-500/10"
      >
        {tab === "books" ? <BookSection /> : <CustomerSection />}
      </motion.div>
    </div>
  );
}
