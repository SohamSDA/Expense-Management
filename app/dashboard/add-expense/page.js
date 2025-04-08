'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

export default function AddExpensePage() {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const { error } = await supabase.from('expenses').insert({
      title,
      amount: parseFloat(amount),
      category,
    });

    setLoading(false);

    if (error) {
      console.error('❌ Insert error:', error.message);
    } else {
      setSuccess(true);
      setTitle('');
      setAmount('');
      setCategory('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white px-4">
      <div className="bg-[#1e293b] p-6 rounded-xl shadow-xl w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center">Add Expense</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            className="w-full px-4 py-2 bg-[#111827] border border-gray-700 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Amount"
            className="w-full px-4 py-2 bg-[#111827] border border-gray-700 rounded"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Category (optional)"
            className="w-full px-4 py-2 bg-[#111827] border border-gray-700 rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded font-semibold w-full"
          >
            {loading ? 'Adding...' : 'Add Expense'}
          </button>
        </form>

        {success && (
          <p className="text-green-400 text-center font-medium">
            ✅ Expense added successfully!
          </p>
        )}
      </div>
    </div>
  );
}
