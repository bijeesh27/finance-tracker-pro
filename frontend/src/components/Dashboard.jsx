import React from "react";
import { FinancialSummary } from "./FinancialSummary";
import { TransactionList } from "./TransactionList";
import { AddTransaction } from "./AddTransaction";
import { GlobalProvider } from "../context/GlobalState";
import { Navbar } from "./Navbar";

const Dashboard = () => {
  return (
    <GlobalProvider>
      <div className="h-screen bg-gray-100 flex flex-col font-sans text-gray-800 overflow-hidden">
        <Navbar />

        <div className="flex-1 flex p-6 gap-6 overflow-hidden">
          {/* Section 1: Financial Summary & Stats (33%) */}
          <div className="flex-1 bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 border border-white/50 p-6 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
            <FinancialSummary />
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
      </div>
    </GlobalProvider>
  );
};

export default Dashboard;
