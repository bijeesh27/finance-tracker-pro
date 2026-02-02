import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2,
  ShoppingBag,
  Edit2,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";
import { getCategoryColor, getCategoryIcon } from "../utils/constants";

export const TransactionList = () => {
  const {
    transactions,
    getTransactions,
    deleteTransaction,
    pagination,
    setEditingTransaction,
    dateFilter,
    total: totalTransactions,
    loading,
    error,
  } = useContext(GlobalContext);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState(null);

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteClick = (id) => {
    setTransactionToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (transactionToDelete) {
      deleteTransaction(transactionToDelete);
      setDeleteModalOpen(false);
      setTransactionToDelete(null);
    }
  };

  const cancelDelete = () => {
    setDeleteModalOpen(false);
    setTransactionToDelete(null);
  };

  const handleEditClick = (transaction) => {
    setEditingTransaction(transaction);
  };

  const handlePageChange = (page) => {
    getTransactions(page, 10, dateFilter.startDate, dateFilter.endDate);
  };

  return (
    <>
      <div className="flex flex-col h-full bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden relative">
        <div className="p-6 border-b border-gray-100 bg-white z-10 flex items-center justify-between">
          <h3 className="text-lg font-black text-gray-900 tracking-tight">
            {dateFilter.type === "all" ? "Transactions" : "Filtered Results"}
          </h3>
          <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {totalTransactions} items total
          </span>
        </div>

        {error && (
          <div className="mx-6 mt-4 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-bold animate-in fade-in slide-in-from-top-4 duration-300">
            <AlertTriangle size={18} />
            {error}
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
          {loading ? (
            <div className="h-full flex flex-col items-center justify-center space-y-4 py-12">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 rounded-full border-4 border-indigo-100"></div>
                <div className="absolute inset-0 rounded-full border-4 border-t-indigo-600 animate-spin"></div>
              </div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Fetching Transactions...
              </p>
            </div>
          ) : (
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
                      <div className="flex gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all">
                        <button
                          onClick={() => handleEditClick(transaction)}
                          className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(transaction._id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}

          {!loading && transactions.length === 0 && !error && (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-60 min-h-[200px]">
              <div className="p-4 bg-gray-50 rounded-full mb-3">
                <ShoppingBag size={32} />
              </div>
              <p className="text-sm font-bold text-gray-500">
                {dateFilter.type === "all"
                  ? "No transactions yet"
                  : "No results found"}
              </p>
              <p className="text-xs text-gray-400 mt-1 text-center px-4 leading-relaxed">
                {dateFilter.type === "all"
                  ? "Start by adding a new one"
                  : `Nothing recorded for ${dateFilter.label}`}
              </p>
            </div>
          )}
        </div>

        {/* Pagination Footer */}
        {(pagination?.prev || pagination?.next) && (
          <div className="p-4 border-t border-gray-100 bg-white flex justify-between items-center">
            <button
              disabled={!pagination.prev}
              onClick={() => handlePageChange(pagination.prev.page)}
              className={`flex items-center gap-1 text-sm font-bold px-3 py-2 rounded-lg transition-colors ${
                pagination.prev
                  ? "text-gray-600 hover:bg-gray-100"
                  : "text-gray-300 cursor-not-allowed"
              }`}
            >
              <ChevronLeft size={16} />
              Prev
            </button>
            <button
              disabled={!pagination.next}
              onClick={() => handlePageChange(pagination.next.page)}
              className={`flex items-center gap-1 text-sm font-bold px-3 py-2 rounded-lg transition-colors ${
                pagination.next
                  ? "text-gray-600 hover:bg-gray-100"
                  : "text-gray-300 cursor-not-allowed"
              }`}
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full border border-gray-100"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-50 text-red-500 mb-4 mx-auto">
                <AlertTriangle size={24} />
              </div>
              <h3 className="text-lg font-black text-center text-gray-900 mb-2">
                Delete Transaction?
              </h3>
              <p className="text-sm text-gray-500 text-center mb-6">
                Are you sure you want to delete this transaction? This action
                cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={cancelDelete}
                  className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold text-sm transition-colors shadow-lg shadow-red-500/30"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
