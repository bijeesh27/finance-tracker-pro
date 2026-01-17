import React from "react";
import { FinancialSummary } from "./FinancialSummary";
import { TransactionList } from "./TransactionList";
import { AddTransaction } from "./AddTransaction";
import { GlobalProvider } from "../context/GlobalState";
import { motion } from "framer-motion";
import { Wallet } from "lucide-react";

const Dashboard = () => {
  return (
    <GlobalProvider>
      <div className="h-screen bg-gray-100 flex p-6 gap-6 font-sans text-gray-800 overflow-hidden">
        {/* Section 1: Financial Summary & Stats (33%) */}
        <div className="flex-1 bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 border border-white/50 p-6 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
          <div className="flex items-center gap-3 px-2">
            <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-200">
              <Wallet size={24} />
            </div>
            <h1 className="text-xl font-black text-gray-900 tracking-tight">
              FinancePro
            </h1>
          </div>

          <div className="flex-1">
            <FinancialSummary />
          </div>

          
        </div>

        {/* Section 2: Transaction List (33%) */}
        <div className="flex-1 bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 border border-white/50 overflow-hidden flex flex-col">
          <TransactionList />
        </div>

        {/* Section 3: Add Transaction (33%) */}
        <div className="flex-1 bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 border border-white/50 p-8 flex flex-col justify-center overflow-y-auto custom-scrollbar">
          <AddTransaction />
        </div>
      </div>
    </GlobalProvider>
  );
};

export default Dashboard;
