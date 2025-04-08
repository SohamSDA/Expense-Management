"use client";

import ScrollReveal from "./ui/ScrollReveal/ScrollReveal";
export default function HomePages2() {
  return (
    <div>
      <div className="relative flex flex-col justify-center items-center z-10 max-w-3xl mx-auto text-center px-6 py-20">
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={5}
          blurStrength={10}
        >
          Manage Smartly & Make Your Money Work for You
        </ScrollReveal>
        <p className="mt-6 max-w-xl text-white/80 text-lg leading-relaxed">
          From budgeting to investing, simplify every aspect of your financial
          journey
        </p>
        <div className="m-20 flex ">
          <div className="w-80 h-72 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg m-6 p-6 space-y-4 border border-white/20 text-white">
            <h3 className="text-lg font-semibold">Latest Transactions</h3>
            <div className="flex justify-between items-center border-b border-white/20 pb-2">
              <div>
                <p className="font-medium">Income: Salary Oct</p>
                <p className="text-xs text-white/60">Successfully</p>
              </div>
              <p className="text-green-400 font-semibold">+$1200</p>
            </div>
            <div className="flex justify-between items-center pt-2">
              <div>
                <p className="font-medium">Electric Bill</p>
                <p className="text-xs text-white/60">Successfully</p>
              </div>
              <p className="text-red-400 font-semibold">- $480</p>
            </div>
          </div>

          <div className="w-80 h-72 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg m-6 p-6 space-y-4 border border-white/20 text-white">
            <h3 className="text-lg font-semibold">Budget Overview</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Rent</span>
                <span className="text-red-400">- $900</span>
              </div>
              <div className="flex justify-between">
                <span>Groceries</span>
                <span className="text-red-400">- $200</span>
              </div>
              <div className="flex justify-between">
                <span>Savings</span>
                <span className="text-green-400">+ $500</span>
              </div>
            </div>
          </div>

          <div className="w-80 h-72 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg m-6 p-6 space-y-4 border border-white/20 text-white flex flex-col justify-between">
            <div className="flex-1">
              {/* You can also embed a small SVG sparkline or a static graph here */}
              <p className="text-md font-semibold mb-2">AI Market Insights</p>
              <p className="text-sm text-white/70">
                Smart predictions to guide your investments based on your
                spending behavior.
              </p>
            </div>
            <div>
              <button className="mt-4 text-sm text-purple-300 hover:underline">
                Explore Insights →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
