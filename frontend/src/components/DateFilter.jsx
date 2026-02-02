import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Calendar, Filter, X, ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const DateFilter = () => {
  const { setDateFilter, dateFilter } = useContext(GlobalContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleDateChange = (e) => {
    const dateStr = e.target.value; // YYYY-MM-DD
    if (!dateStr) return;

    // Create Local date range for the selected day
    const [year, month, day] = dateStr.split("-").map(Number);
    const start = new Date(year, month - 1, day, 0, 0, 0, 0);
    const end = new Date(year, month - 1, day, 23, 59, 59, 999);

    setDateFilter({
      startDate: start.toISOString(),
      endDate: end.toISOString(),
      type: "day",
      label: start.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    });
    setIsOpen(false);
  };

  const handleMonthChange = (e) => {
    const monthStr = e.target.value; // YYYY-MM
    if (!monthStr) return;

    const [year, month] = monthStr.split("-").map(Number);
    // Start of the month (Local)
    const start = new Date(year, month - 1, 1, 0, 0, 0, 0);
    // End of the month (Local)
    const end = new Date(year, month, 0, 23, 59, 59, 999);

    setDateFilter({
      startDate: start.toISOString(),
      endDate: end.toISOString(),
      type: "month",
      label: start.toLocaleDateString("en-IN", {
        month: "long",
        year: "numeric",
      }),
    });
    setIsOpen(false);
  };

  const clearFilter = () => {
    setDateFilter({
      startDate: null,
      endDate: null,
      type: "all",
      label: null,
    });
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl shadow-sm text-sm font-bold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
        >
          <Calendar size={18} className="text-indigo-600" />
          <span>
            {dateFilter.type === "all" ? "All Time" : dateFilter.label}
          </span>
          <ChevronDown
            size={16}
            className={`text-gray-400 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            ></div>
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-2 w-72 origin-top-right bg-white rounded-2xl shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none z-20 overflow-hidden border border-gray-100"
            >
              <div className="p-4 border-b border-gray-50">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">
                  Filter by Date
                </h3>
              </div>

              <div className="p-4 space-y-4">
                {/* Specific Date */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 flex items-center gap-2">
                    <Check
                      size={14}
                      className={
                        dateFilter.type === "day"
                          ? "text-green-500"
                          : "text-transparent"
                      }
                    />
                    Choose a Date
                  </label>
                  <input
                    type="date"
                    onChange={handleDateChange}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                {/* Specific Month */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 flex items-center gap-2">
                    <Check
                      size={14}
                      className={
                        dateFilter.type === "month"
                          ? "text-green-500"
                          : "text-transparent"
                      }
                    />
                    Choose a Month
                  </label>
                  <input
                    type="month"
                    onChange={handleMonthChange}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                {/* Reset Button */}
                {dateFilter.type !== "all" && (
                  <button
                    onClick={clearFilter}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl text-sm font-bold hover:bg-red-100 transition-colors"
                  >
                    <X size={16} />
                    Clear Filter
                  </button>
                )}

                {dateFilter.type === "all" && (
                  <button
                    disabled
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 text-gray-400 rounded-xl text-sm font-bold cursor-not-allowed"
                  >
                    Showing All Data
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
