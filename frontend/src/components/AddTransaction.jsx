import { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { motion } from "framer-motion";
import { Plus, Tag, IndianRupee, Type } from "lucide-react";
import { CATEGORIES } from "../utils/constants";

export const AddTransaction = () => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");

  const [error, setError] = useState("");

  const { addTransaction } = useContext(GlobalContext);

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!text || !amount) {
      setError("Please fill in all fields");
      return;
    }

    if (isNaN(amount) || amount === 0) {
      setError("Please enter a valid non-zero amount");
      return;
    }

    const newTransaction = {
      text,
      amount: +amount,
      category,
    };

    addTransaction(newTransaction);
    setText("");
    setAmount("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-full max-w-sm mx-auto flex flex-col justify-center h-full"
    >
      <div className="flex items-center gap-4 mb-10">
        <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl shadow-sm border border-indigo-100">
          <Plus size={28} />
        </div>
        <div>
          <h3 className="text-2xl font-black text-gray-900 tracking-tight">
            New Transaction
          </h3>
          <p className="text-sm text-gray-400 font-medium mt-1">
            Enter details below
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 border border-red-100 rounded-2xl text-xs font-bold flex items-center gap-3 animate-pulse">
          <span className="text-lg">⚠️</span> {error}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-1.5">
            <Type size={12} /> Description
          </label>
          <input
            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-semibold text-gray-700 placeholder:text-gray-300 placeholder:font-normal"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="e.g. Weekly Groceries"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-1.5">
            <Tag size={12} /> Category
          </label>
          <div className="relative">
            <select
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-semibold text-gray-700 appearance-none cursor-pointer"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {Object.values(CATEGORIES).map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <Plus size={16} className="rotate-45" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-1.5">
            <IndianRupee size={12} /> Amount
          </label>
          <div className="relative">
            <input
              type="number"
              className="w-full p-4 pl-10 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-black text-lg text-gray-700 placeholder:text-gray-300"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-lg">
              ₹
            </span>
          </div>
          <p className="text-[10px] text-gray-400 font-medium mt-2 px-1 text-center">
            Use <span className="text-red-500 font-bold">negative</span> for
            expenses and{" "}
            <span className="text-green-500 font-bold">positive</span> for
            income
          </p>
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          whileHover={{ scale: 1.02, translateY: -2 }}
          className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all duration-300 flex items-center justify-center gap-2 tracking-wide mt-4"
        >
          Add Transaction
        </motion.button>
      </form>
    </motion.div>
  );
};
