import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { PlusCircle, X, Edit2, Trash2, BookOpen, Search } from "lucide-react";

export default function BookSection() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: "", author: "", price: "", stock: "" });
  const [editing, setEditing] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  const fetchBooks = async () => {
    try {
      const res = await fetch(`${API_URL}/api/books`);
      const data = await res.json();
      setBooks(data);
    } catch {
      toast.error("Failed to load books");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editing ? "PUT" : "POST";
    const url = editing ? `${API_URL}/api/books/${editing.id}` : `${API_URL}/api/books`;

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      toast.success(editing ? "Book updated!" : "Book added!");
      setForm({ title: "", author: "", price: "", stock: "" });
      setEditing(null);
      setShowModal(false);
      fetchBooks();
    } else toast.error("Error saving book");
  };

  const handleDelete = async (id) => {
    const res = await fetch(`${API_URL}/api/books/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Book deleted!");
      fetchBooks();
    } else toast.error("Delete failed");
  };

  const openEdit = (book) => {
    setEditing(book);
    setForm(book);
    setShowModal(true);
  };

  const openAdd = () => {
    setEditing(null);
    setForm({ title: "", author: "", price: "", stock: "" });
    setShowModal(true);
  };

  const filteredBooks = books.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <BookOpen size={24} className="text-blue-400" />
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Books
          </h2>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-90 px-4 py-2 rounded-full text-white font-medium shadow-lg shadow-blue-500/20 transition"
        >
          <PlusCircle size={18} /> Add Book
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={18} className="absolute left-3 top-2.5 text-slate-400" />
        <input
          placeholder="Search by title or author..."
          className="pl-10 pr-3 py-2 w-full rounded-lg bg-slate-800 border border-slate-700 text-slate-200 focus:border-blue-400 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-700/50 bg-slate-800/40 backdrop-blur-lg shadow-inner">
        <table className="w-full text-sm text-slate-300">
          <thead className="bg-slate-700/60 text-slate-200">
            <tr>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Author</th>
              <th className="px-4 py-3 text-right">Price</th>
              <th className="px-4 py-3 text-right">Stock</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-4 text-center text-slate-500">
                  No books found.
                </td>
              </tr>
            ) : (
              filteredBooks.map((b) => (
                <motion.tr
                  key={b.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.01 }}
                  className="border-b border-slate-700/50 hover:bg-slate-700/40"
                >
                  <td className="px-4 py-3">{b.title}</td>
                  <td className="px-4 py-3">{b.author}</td>
                  <td className="px-4 py-3 text-right">Rs. {b.price}</td>
                  <td className="px-4 py-3 text-right">{b.stock}</td>
                  <td className="px-4 py-3 text-center space-x-2">
                    <button
                      onClick={() => openEdit(b)}
                      className="p-2 bg-green-600/80 rounded-lg hover:bg-green-600 transition"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(b.id)}
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
                  {editing ? "Edit Book" : "Add Book"}
                </h3>
                <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
                {["title", "author", "price", "stock"].map((key) => (
                  <input
                    key={key}
                    placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                    type={key === "price" || key === "stock" ? "number" : "text"}
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 focus:border-blue-400 outline-none"
                  />
                ))}
                <button
                  type="submit"
                  className="mt-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-2 rounded-lg hover:opacity-90 transition"
                >
                  {editing ? "Update Book" : "Add Book"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
