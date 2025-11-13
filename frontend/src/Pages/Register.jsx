import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

export default function Register() {
  const API = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      toast.error("Please fill all fields");
      return;
    }

    const res = await fetch(`${API}/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Registered successfully");
      navigate("/login");
    } else {
      toast.error(data.error || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white px-4">
      <motion.form
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        onSubmit={handleSubmit}
        className="bg-slate-800/90 backdrop-blur-xl p-6 rounded-2xl shadow-2xl w-full max-w-sm flex flex-col space-y-4 border border-slate-700"
      >
        <h2 className="text-2xl font-bold text-center text-cyan-400">
          Create Account
        </h2>

        <input
          placeholder="Name"
          className="p-3 rounded-lg bg-slate-700 border border-slate-600 outline-none focus:border-cyan-400"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email"
          className="p-3 rounded-lg bg-slate-700 border border-slate-600 outline-none focus:border-cyan-400"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        {/* Password */}
        <div className="relative">
          <input
            type={showPass ? "text" : "password"}
            placeholder="Password"
            className="p-3 w-full rounded-lg bg-slate-700 border border-slate-600 outline-none focus:border-cyan-400 pr-10"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-slate-400 hover:text-white"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button className="bg-gradient-to-r from-blue-500 to-cyan-500 py-3 rounded-lg shadow hover:opacity-90 transition">
          Register
        </button>

        <p className="text-center text-sm text-slate-300">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-cyan-400 underline"
          >
            Login
          </button>
        </p>
      </motion.form>
    </div>
  );
}
