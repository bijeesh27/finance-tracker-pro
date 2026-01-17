import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ShoppingBag } from "lucide-react";
import { getCategoryColor, getCategoryIcon } from "../utils/constants";

export const TransactionList = () => {
  const { transactions, getTransactions, deleteTransaction } =
    useContext(GlobalContext);

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col h-full bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100 bg-white z-10 flex items-center justify-between">
        <h3 className="text-lg font-black text-gray-900 tracking-tight">
          Recent Transactions
        </h3>
        <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {transactions.length} items
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        <AnimatePresence mode="popLayout">
          {transactions.map((transaction, index) => {
            const Icon = getCategoryIcon(transaction.category);
            const color = getCategoryColor(transaction.category);
            const isExpense = transaction.amount < 0;

            return (
              <motion.div
                layout
                key={transaction._id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group flex items-center justify-between p-4 bg-gray-50 hover:bg-white border boundary-transparent hover:border-gray-200 hover:shadow-lg hover:shadow-gray-100 rounded-2xl transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="p-3 rounded-xl transition-colors"
                    style={{
                      backgroundColor: isExpense ? `${color}20` : "#ECFDF5",
                      color: isExpense ? color : "#10B981",
                    }}
                  >
                    <Icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm leading-tight">
                      {transaction.text}
                    </h4>
                    <p className="text-[10px] uppercase font-bold text-gray-400 mt-1 flex items-center gap-1">
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          backgroundColor: isExpense ? color : "#10B981",
                        }}
                      ></span>
                      {transaction.category}
                      <span className="text-gray-300">•</span>
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={`font-black text-sm tracking-tight ${
                      isExpense ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    {isExpense ? "-" : "+"}₹{Math.abs(transaction.amount)}
                  </span>
                  <button
                    onClick={() => deleteTransaction(transaction._id)}
                    className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {transactions.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-60">
            <div className="p-4 bg-gray-50 rounded-full mb-3">
              <ShoppingBag size={32} />
            </div>
            <p className="text-sm font-bold text-gray-500">
              No transactions yet
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Start by adding a new one
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
