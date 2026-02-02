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
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
    const end = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
      999,
    );

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

  const setAllTime = () => {
    setDateFilter({
      startDate: null,
      endDate: null,
      type: "all",
      label: "All Time",
    });
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left w-full sm:w-auto">
      <div className="w-full sm:w-auto">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full sm:w-auto inline-flex items-center justify-between sm:justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl shadow-sm text-sm font-bold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all active:scale-95 sm:active:scale-100"
        >
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-indigo-600" />
            <span>
              {dateFilter.type === "all" ? "All Time" : dateFilter.label}
            </span>
          </div>
          <ChevronDown
            size={16}
            className={`text-gray-400 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay for mobile and desktop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] sm:bg-transparent sm:backdrop-blur-none"
              onClick={() => setIsOpen(false)}
            ></motion.div>

            {/* Dropdown / Mobile Modal */}
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 sm:absolute sm:inset-auto sm:top-full sm:right-0 sm:translate-y-0 mt-2 sm:w-72 bg-white rounded-[2rem] sm:rounded-2xl shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none z-50 overflow-hidden border border-gray-100"
              style={{ maxHeight: "90vh" }}
            >
              <div className="p-5 sm:p-4 border-b border-gray-50 flex items-center justify-between">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">
                  Filter by Date
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="sm:hidden p-2 text-gray-400 hover:text-gray-900"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 sm:p-4 space-y-5 sm:space-y-4 overflow-y-auto max-h-[60vh] sm:max-h-none">
                {/* Specific Date */}
                <div className="space-y-2.5 sm:space-y-2">
                  <label className="text-xs font-bold text-gray-500 flex items-center gap-2 uppercase tracking-wide">
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
                    className="w-full px-4 py-3 sm:py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all cursor-pointer"
                  />
                </div>

                {/* Specific Month */}
                <div className="space-y-2.5 sm:space-y-2">
                  <label className="text-xs font-bold text-gray-500 flex items-center gap-2 uppercase tracking-wide">
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
                    className="w-full px-4 py-3 sm:py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all cursor-pointer"
                  />
                </div>

                <div className="pt-2 space-y-2">
                  {/* All Time Option */}
                  <button
                    onClick={setAllTime}
                    className={`w-full flex items-center justify-between px-4 py-3 sm:py-2 rounded-xl text-sm font-bold transition-all ${
                      dateFilter.type === "all"
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Filter size={16} />
                      Show All Time
                    </div>
                    {dateFilter.type === "all" && <Check size={16} />}
                  </button>

                  {/* Reset Button */}
                  {dateFilter.type !== "month" ||
                  (dateFilter.type === "month" &&
                    dateFilter.label !==
                      new Date().toLocaleDateString("en-IN", {
                        month: "long",
                        year: "numeric",
                      })) ? (
                    <button
                      onClick={clearFilter}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 sm:py-2 bg-red-50 text-red-600 rounded-xl text-sm font-bold hover:bg-red-100 transition-colors active:scale-95"
                    >
                      <X size={16} />
                      Reset to This Month
                    </button>
                  ) : null}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
