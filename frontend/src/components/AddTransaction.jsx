import { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { motion } from "framer-motion";
import { Plus, Tag, IndianRupee, Type } from "lucide-react";

export const AddTransaction = () => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");

  const { addTransaction } = useContext(GlobalContext);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!text || !amount) return;

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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white p-8 rounded-[2rem] premium-shadow border border-white/50 glass-card"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
          <Plus size={20} />
        </div>
        <h3 className="text-xl font-black text-gray-900 tracking-tight">
          New Transaction
        </h3>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
            <Type size={14} /> Description
          </label>
          <input
            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all font-medium text-gray-700 placeholder:text-gray-300"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="e.g. Weekly Groceries"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
            <Tag size={14} /> Category
          </label>
          <div className="relative">
            <select
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all font-medium text-gray-700 appearance-none"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Food">🍔 Food & Dining</option>
              <option value="Rent">🏠 Rent & Bills</option>
              <option value="Salary">💰 Salary & Income</option>
              <option value="Entertainment">🎮 Entertainment</option>
              <option value="Shopping">🛍️ Shopping</option>
              <option value="Travel">✈️ Travel</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <Plus size={16} className="rotate-45" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
            <IndianRupee size={14} /> Amount
          </label>
          <div className="relative">
            <input
              type="number"
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all font-black text-gray-700 placeholder:text-gray-300 pl-10"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
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
          whileHover={{ scale: 1.02 }}
          className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black rounded-2xl hover:shadow-2xl hover:shadow-blue-200/50 transition-all duration-300 flex items-center justify-center gap-2 tracking-wide"
        >
          Add Transaction
        </motion.button>
      </form>
    </motion.div>
  );
};
