import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { motion } from "framer-motion";
import {
  IndianRupee,
  ArrowUpCircle,
  ArrowDownCircle,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { CATEGORIES, getCategoryColor } from "../utils/constants";

export const FinancialSummary = () => {
  const { transactions } = useContext(GlobalContext);

  // Balance Logic
  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);
  const isPositive = total >= 0;

  // Chart Logic - Group by Category
  const data = transactions.reduce((acc, curr) => {
    if (curr.amount < 0) {
      const found = acc.find((item) => item.name === curr.category);
      if (found) found.value += Math.abs(curr.amount);
      else acc.push({ name: curr.category, value: Math.abs(curr.amount) });
    }
    return acc;
  }, []);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-xl shadow-lg border border-gray-100 ring-1 ring-black/5">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
            {payload[0].name}
          </p>
          <p className="text-lg font-black text-gray-900">
            ₹{payload[0].value.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 flex flex-col h-full font-sans">
      {/* Total Balance Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden p-8 bg-indigo-600 rounded-[2rem] text-white shadow-2xl shadow-indigo-200"
      >
        <div className="relative z-10 flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <h2 className="text-indigo-200 font-bold text-xs uppercase tracking-widest">
              Total Balance
            </h2>
            <div
              className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold ${
                isPositive
                  ? "bg-green-500/20 text-green-300"
                  : "bg-red-500/20 text-red-300"
              }`}
            >
              {isPositive ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              {isPositive ? "2.4%" : "1.2%"}
            </div>
          </div>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-2xl opacity-60">₹</span>
            <h1 className="text-4xl font-black tracking-tighter">{total}</h1>
          </div>
        </div>

        {/* Background Decoration */}
        <div className="absolute -right-6 -bottom-12 opacity-10 rotate-12">
          <IndianRupee size={180} strokeWidth={1.5} />
        </div>
      </motion.div>

      {/* Income & Expense Stats */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div
          whileHover={{ y: -2 }}
          className="p-5 bg-white rounded-[1.5rem] border border-gray-100 shadow-sm flex flex-col justify-between group hover:border-green-100 transition-all"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-green-50 text-green-500 rounded-full group-hover:bg-green-100 transition-colors">
              <ArrowUpCircle size={18} />
            </div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Income
            </span>
          </div>
          <p className="text-xl font-bold text-gray-900 tracking-tight">
            ₹{income}
          </p>
        </motion.div>

        <motion.div
          whileHover={{ y: -2 }}
          className="p-5 bg-white rounded-[1.5rem] border border-gray-100 shadow-sm flex flex-col justify-between group hover:border-red-100 transition-all"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-red-50 text-red-500 rounded-full group-hover:bg-red-100 transition-colors">
              <ArrowDownCircle size={18} />
            </div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Expense
            </span>
          </div>
          <p className="text-xl font-bold text-gray-900 tracking-tight">
            ₹{expense}
          </p>
        </motion.div>
      </div>

      {/* Expense Breakdown Chart */}
      <div className="flex-1 bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">
            Spending
          </h3>
          <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-full">
            This Month
          </span>
        </div>

        {data.length > 0 ? (
          <div className="flex-1 flex flex-col">
            <div className="flex-1 relative min-h-[160px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    innerRadius={55}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                    cornerRadius={6}
                    stroke="none"
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={getCategoryColor(entry.name)}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>

              {/* Center Text */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <p className="text-xs font-bold text-gray-400 uppercase">
                    Total
                  </p>
                  <p className="text-lg font-black text-gray-900">₹{expense}</p>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="mt-4 flex flex-wrap gap-2 justify-center content-center max-h-[80px] overflow-y-auto custom-scrollbar">
              {data.map((entry, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 rounded-lg border border-gray-100"
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: getCategoryColor(entry.name) }}
                  />
                  <span className="text-[10px] font-bold text-gray-600">
                    {entry.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-300">
            <div className="w-16 h-16 rounded-full border-4 border-gray-100 border-t-gray-200 animate-spin mb-3"></div>
            <p className="text-xs font-semibold">No expense data</p>
          </div>
        )}
      </div>
    </div>
  );
};
