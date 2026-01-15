import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, IndianRupee } from "lucide-react";

export const Balance = () => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const isPositive = total >= 0;

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="relative overflow-hidden p-8 bg-gradient-to-br from-white to-gray-50 rounded-3xl premium-shadow border border-white/50 glass-card"
    >
      {/* Decorative background circle */}
      <div
        className={`absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-10 ${
          isPositive ? "bg-green-500" : "bg-red-500"
        }`}
      ></div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <div
            className={`p-2 rounded-lg ${
              isPositive
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            <IndianRupee size={16} />
          </div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
            Total Balance
          </h4>
        </div>

        <div className="flex items-baseline gap-1">
          <h1
            className={`text-6xl font-black tracking-tight ${
              isPositive ? "text-gray-900" : "text-red-600"
            }`}
          >
            ₹{total}
          </h1>
        </div>

        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className={`mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-bold ${
            isPositive ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
          }`}
        >
          {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          {isPositive ? "+2.5%" : "-1.2%"}
          <span className="font-medium opacity-70 ml-1">from last month</span>
        </motion.div>
      </div>
    </motion.div>
  );
};
