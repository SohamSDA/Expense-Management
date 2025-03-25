// components/Card.jsx
"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "Jan", amount: 1200 },
  { name: "Feb", amount: 2100 },
  { name: "Mar", amount: 800 },
  { name: "Apr", amount: 1600 },
  { name: "May", amount: 2400 },
];

export default function CardSection() {
  return (
    <div className="my-10 flex flex-col md:flex-col gap-10 items-center">
      {/* Glassy Card */}
      <div className="relative w-80 h-48 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg z-20 p-6 space-y-4 border border-white/20">
        <div className="flex justify-between">
          <div>
            <p className="text-xs opacity-60">Name</p>
            <p className="tracking-wide font-medium">Carter Mullen</p>
          </div>
          <img
            src="/mastercard.svg"
            className="h-10 w-10 "
            alt="Mastercard"
          />
        </div>

        <div>
          <p className="text-xs opacity-60">Card Number</p>
          <p className="tracking-widest font-semibold text-lg">
            4312 5678 7864 7890
          </p>
        </div>

        <div className="flex justify-between text-xs">
          <div>
            <p className="opacity-60">Valid From</p>
            <p>11/15</p>
          </div>
          <div>
            <p className="opacity-60">Expiry</p>
            <p>03/25</p>
          </div>
          <div>
            <p className="opacity-60">CVV</p>
            <p className="font-semibold">521</p>
          </div>
        </div>
      </div>

      {/* Graph Section */}
      <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10 w-full md:w-[400px] h-[250px] text-white">
        <p className="font-semibold mb-2">Spending Analytics</p>
        <ResponsiveContainer width="100%" height="90%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
            <XAxis dataKey="name" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip
              contentStyle={{ backgroundColor: "#111827", border: "none" }}
              labelStyle={{ color: "#a78bfa" }}
            />
            <Line type="monotone" dataKey="amount" stroke="#a78bfa" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
