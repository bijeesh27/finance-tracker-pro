import React, { useContext } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { GlobalContext } from "../context/GlobalState";
import { TrendingDown } from "lucide-react";

export const TransactionChart = () => {
  const { transactions } = useContext(GlobalContext);

  // Group data for the chart
  const data = transactions.reduce((acc, curr) => {
    if (curr.amount < 0) {
      const found = acc.find((item) => item.name === curr.category);
      if (found) found.value += Math.abs(curr.amount);
      else acc.push({ name: curr.category, value: Math.abs(curr.amount) });
    }
    return acc;
  }, []);

  const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899", "#06B6D4"];

  const total = data.reduce((sum, item) => sum + item.value, 0);

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const percentage = ((payload[0].value / total) * 100).toFixed(1);
      return (
        <div className="bg-white px-4 py-3 rounded-xl shadow-lg border border-gray-200">
          <p className="text-sm font-bold text-gray-800">{payload[0].name}</p>
          <p className="text-lg font-black text-indigo-600">₹{payload[0].value.toFixed(2)}</p>
          <p className="text-xs text-gray-500">{percentage}% of total</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-2xl border-2 border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-50 rounded-lg">
            <TrendingDown className="text-indigo-600" size={20} />
          </div>
          <h3 className="text-xl font-black text-gray-900">Expense Breakdown</h3>
        </div>
        <div className="text-right">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</p>
          <p className="text-2xl font-black text-gray-900">₹{total.toFixed(2)}</p>
        </div>
      </div>

      {data.length > 0 ? (
        <>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                  strokeWidth={2}
                  stroke="#fff"
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]}
                      className="hover:opacity-80 transition-opacity duration-200 cursor-pointer"
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Custom Legend */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            {data.map((entry, index) => {
              const percentage = ((entry.value / total) * 100).toFixed(1);
              return (
                <div key={index} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div 
                    className="w-4 h-4 rounded-full flex-shrink-0" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">{entry.name}</p>
                    <p className="text-xs text-gray-500">₹{entry.value.toFixed(2)} ({percentage}%)</p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="p-4 bg-gray-100 rounded-full mb-4">
            <TrendingDown className="text-gray-400" size={48} />
          </div>
          <p className="text-gray-500 font-semibold text-center">No expense data available</p>
          <p className="text-gray-400 text-sm text-center mt-1">Add some transactions to see the breakdown</p>
        </div>
      )}
    </div>
  );
};