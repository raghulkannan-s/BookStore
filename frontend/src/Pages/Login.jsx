import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

export default function Login() {
  const API = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!form.email || !form.password) {
      toast.error("Enter email and password");
      return;
    }

    try {
      setLoading(true);
      const loadingId = toast.loading("Logging in...");

      const res = await fetch(`${API}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      toast.dismiss(loadingId);

      let data = {};
      try {
        data = await res.json();
      } catch {
        data = { error: "Invalid server response" };
      }

      if (!res.ok) {
        toast.error(data.error || "Login failed");
        return;
      }

      toast.success("Login successful");
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/");

    } catch (err) {
      toast.error("Network error — check your connection");
    } finally {
      setLoading(false);
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
          Login
        </h2>

        <input
          placeholder="Email"
          className="p-3 rounded-lg bg-slate-700 border border-slate-600 outline-none focus:border-cyan-400"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <div className="relative">
          <input
            type={showPass ? "text" : "password"}
            placeholder="Password"
            className="p-3 w-full rounded-lg bg-slate-700 border border-slate-600 outline-none focus:border-cyan-400 pr-12"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button
            type="button"
            className="absolute right-3 top-3 cursor-pointer text-slate-400 hover:text-white"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button
          disabled={loading}
          className={`py-3 rounded-lg shadow bg-gradient-to-r from-blue-500 to-cyan-500 transition ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
          }`}
        >
          {loading ? "Processing..." : "Login"}
        </button>

        <p className="text-center text-sm text-slate-300">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="cursor-pointer text-cyan-400 underline"
          >
            Register
          </button>
        </p>
      </motion.form>
    </div>
  );
}
