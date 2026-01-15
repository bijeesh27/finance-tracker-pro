import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { motion } from "framer-motion";
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";

export const IncomeExpenses = () => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map((transaction) => transaction.amount);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <motion.div
        whileHover={{ y: -5 }}
        className="p-6 bg-white rounded-3xl premium-shadow border border-white/50 glass-card flex items-center gap-5"
      >
        <div className="p-4 bg-green-50 text-green-600 rounded-2xl">
          <ArrowUpCircle size={32} />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">
            Income
          </p>
          <p className="text-3xl font-black text-green-600">₹{income}</p>
        </div>
      </motion.div>

      <motion.div
        whileHover={{ y: -5 }}
        className="p-6 bg-white rounded-3xl premium-shadow border border-white/50 glass-card flex items-center gap-5"
      >
        <div className="p-4 bg-red-50 text-red-600 rounded-2xl">
          <ArrowDownCircle size={32} />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">
            Expense
          </p>
          <p className="text-3xl font-black text-red-600">₹{expense}</p>
        </div>
      </motion.div>
    </div>
  );
};
