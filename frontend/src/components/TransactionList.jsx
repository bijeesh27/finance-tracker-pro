import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2,
  ShoppingBag,
  Utensils,
  Zap,
  PlusCircle,
  MinusCircle,
} from "lucide-react";

export const TransactionList = () => {
  const { transactions, getTransactions, deleteTransaction } =
    useContext(GlobalContext);

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getIcon = (text) => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes("food") || lowerText.includes("eat"))
      return <Utensils size={18} />;
    if (lowerText.includes("shop") || lowerText.includes("buy"))
      return <ShoppingBag size={18} />;
    if (lowerText.includes("bill") || lowerText.includes("rent"))
      return <Zap size={18} />;
    return <Zap size={18} />;
  };

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-black text-gray-900 tracking-tight">
          Recent Transactions
        </h3>
        <span className="text-sm font-medium text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
          {transactions.length} total
        </span>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {transactions.map((transaction, index) => (
            <motion.div
              layout
              key={transaction._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.05, duration: 0.2 }}
              className="group relative flex items-center justify-between bg-white p-5 rounded-3xl premium-shadow border border-gray-100 hover:border-blue-200 transition-all duration-300"
            >
              <div className="flex items-center gap-5">
                <div
                  className={`p-3 rounded-2xl ${
                    transaction.amount < 0
                      ? "bg-red-50 text-red-500"
                      : "bg-green-50 text-green-500"
                  }`}
                >
                  {transaction.amount < 0 ? (
                    <MinusCircle size={22} />
                  ) : (
                    <PlusCircle size={22} />
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-lg leading-tight">
                    {transaction.text}
                  </h4>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mt-1 italic">
                    {new Date(transaction.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <span
                  className={`text-xl font-black tracking-tight ${
                    transaction.amount < 0 ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {transaction.amount < 0 ? "-" : "+"}₹
                  {Math.abs(transaction.amount)}
                </span>

                <button
                  onClick={() => deleteTransaction(transaction._id)}
                  className="opacity-0 group-hover:opacity-100 p-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-all duration-300 transform scale-90 group-hover:scale-100"
                >
                  <Trash2 size={20} shade={1.5} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {transactions.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 bg-gray-50/50 rounded-3xl border-2 border-dashed border-gray-200"
        >
          <div className="p-4 bg-gray-100 rounded-full mb-4">
            <ShoppingBag size={40} className="text-gray-300" />
          </div>
          <p className="text-gray-400 font-bold tracking-wide">
            No transactions to show
          </p>
          <p className="text-gray-300 text-sm mt-1">
            Add something to get started!
          </p>
        </motion.div>
      )}
    </div>
  );
};
