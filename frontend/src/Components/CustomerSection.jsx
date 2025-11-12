import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  PlusCircle,
  X,
  Edit2,
  Trash2,
  Users,
  Search,
  ChevronDown,
} from "lucide-react";

export default function CustomerSection() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [editing, setEditing] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const fetchCustomers = async () => {
    try {
      const res = await fetch(`${API_URL}/api/customers`);
      const data = await res.json();
      setCustomers(data);
    } catch {
      toast.error("Failed to load customers");
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editing ? "PUT" : "POST";
    const url = editing
      ? `${API_URL}/api/customers/${editing.id}`
      : `${API_URL}/api/customers`;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast.success(editing ? "Customer updated!" : "Customer added!");
        setForm({ name: "", email: "", phone: "" });
        setEditing(null);
        setShowModal(false);
        fetchCustomers();
      } else toast.error("Error saving customer");
    } catch {
      toast.error("Network error");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this customer?")) return;
    try {
      const res = await fetch(`${API_URL}/api/customers/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Customer deleted!");
        fetchCustomers();
      } else toast.error("Delete failed");
    } catch {
      toast.error("Network error");
    }
  };

  const openEdit = (c) => {
    setEditing(c);
    setForm(c);
    setShowModal(true);
  };

  const openAdd = () => {
    setEditing(null);
    setForm({ name: "", email: "", phone: "" });
    setShowModal(true);
  };

  const filteredCustomers = customers
    .filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        c.phone.includes(search)
    )
    .sort((a, b) => a[sortBy].localeCompare(b[sortBy]));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <Users size={24} className="text-blue-400" />
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Customers
          </h2>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-90 px-4 py-2 rounded-full text-white font-medium shadow-lg shadow-blue-500/20 transition"
        >
          <PlusCircle size={18} /> Add Customer
        </button>
      </div>

      {/* Search + Sort */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-2.5 text-slate-400" />
          <input
            placeholder="Search by name, email or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-3 py-2 w-full rounded-lg bg-slate-800 border border-slate-700 text-slate-200 focus:border-blue-400 outline-none"
          />
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-slate-400 text-sm">Sort by:</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-slate-800 border border-slate-700 text-slate-200 rounded-lg py-2 pl-3 pr-8 focus:border-blue-400 outline-none"
            >
              <option value="name">Name</option>
              <option value="email">Email</option>
              <option value="phone">Phone</option>
            </select>
            <ChevronDown
              size={16}
              className="absolute right-2 top-3 text-slate-400 pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-700/50 bg-slate-800/40 backdrop-blur-lg shadow-inner">
        <table className="w-full text-sm text-slate-300">
          <thead className="bg-slate-700/60 text-slate-200">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-6 text-center text-slate-500">
                  No matching customers found.
                </td>
              </tr>
            ) : (
              filteredCustomers.map((c) => (
                <motion.tr
                  key={c.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.01 }}
                  className="border-b border-slate-700/50 hover:bg-slate-700/40"
                >
                  <td className="px-4 py-3">{c.name}</td>
                  <td className="px-4 py-3">{c.email}</td>
                  <td className="px-4 py-3">{c.phone}</td>
                  <td className="px-4 py-3 text-center space-x-2">
                    <button
                      onClick={() => openEdit(c)}
                      className="p-2 bg-green-600/80 rounded-lg hover:bg-green-600 transition"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="p-2 bg-red-600/80 rounded-lg hover:bg-red-600 transition"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900/90 rounded-2xl p-6 w-[90%] max-w-md shadow-2xl border border-blue-500/30"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-blue-400">
                  {editing ? "Edit Customer" : "Add Customer"}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
                {["name", "email", "phone"].map((key) => (
                  <input
                    key={key}
                    placeholder={
                      key.charAt(0).toUpperCase() + key.slice(1)
                    }
                    type={key === "phone" ? "tel" : "text"}
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 focus:border-blue-400 outline-none"
                  />
                ))}
                <button
                  type="submit"
                  className="mt-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-2 rounded-lg hover:opacity-90 transition"
                >
                  {editing ? "Update Customer" : "Add Customer"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
