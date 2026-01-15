import React from 'react'
import { Header } from "./Header";
import { Balance } from "./Balance";
import { IncomeExpenses } from "./IncomeExpenses";
import { TransactionList } from "./TransactionList";
import { AddTransaction } from "./AddTransaction";
import { TransactionChart } from "./TransactionChart";
import { GlobalProvider } from "../context/GlobalState";
import { motion } from "framer-motion";
const Dashboard = () => {
  return (
    <div>
      <GlobalProvider>
      <div className="min-h-screen bg-[#f8fafc] font-sans">
        <Header />
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-6xl mx-auto p-6 lg:p-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Summary & Chart */}
            <div className="lg:col-span-2 space-y-8">
              <Balance />
              <IncomeExpenses />
              <TransactionChart />
              <TransactionList />
            </div>

            {/* Right Column: Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <AddTransaction />
              </div>
            </div>
          </div>
        </motion.main>
      </div>
    </GlobalProvider>
    </div>
  )
}

export default Dashboard
