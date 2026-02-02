import React from "react";
import { FinancialSummary } from "./FinancialSummary";
import { TransactionList } from "./TransactionList";
import { AddTransaction } from "./AddTransaction";
import { GlobalProvider } from "../context/GlobalState";
import { Navbar } from "./Navbar";
import { DateFilter } from "./DateFilter";

const Dashboard = () => {
  return (
    <GlobalProvider>
      <div className="min-h-screen bg-gray-100 flex flex-col font-sans text-gray-800">
        <Navbar />

        <div className="px-4 lg:px-6 pt-6 pb-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">
              Dashboard
            </h2>
            <p className="text-sm font-bold text-gray-400">
              Manage your finances effortlessly
            </p>
          </div>
          <DateFilter />
        </div>

        <div className="flex-1 flex flex-col lg:flex-row p-4 lg:p-6 gap-6 lg:overflow-hidden">
          {/* Section 1: Financial Summary & Stats (33%) */}
          <div className="flex-1 bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 border border-white/50 p-6 flex flex-col gap-6 lg:overflow-y-auto custom-scrollbar min-h-[500px] lg:min-h-0">
            <FinancialSummary />
          </div>

          {/* Section 2: Transaction List (33%) */}
          <div className="flex-1 bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 border border-white/50 overflow-hidden flex flex-col min-h-[500px] lg:min-h-0">
            <TransactionList />
          </div>

          {/* Section 3: Add Transaction (33%) */}
          <div className="flex-1 bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 border border-white/50 p-6 lg:p-8 flex flex-col justify-center lg:overflow-y-auto custom-scrollbar min-h-[600px] lg:min-h-0">
            <AddTransaction />
          </div>
        </div>
      </div>
    </GlobalProvider>
  );
};

export default Dashboard;
