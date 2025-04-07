'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { createClient } from '@supabase/supabase-js';
import { useUser } from '@clerk/nextjs';
export default function DashboardPage() {
  const { user } = useUser();
  const { getToken } = useAuth();

  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const loadExpenses = async () => {
    const token = await getToken({ template: 'supabase' });

    const client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        global: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }
    );

    const { data, error } = await client
      .from('expenses')
      .select()
      .order('created_at', { ascending: false });

    if (!error) setExpenses(data);
    else console.error('Error loading expenses:', error.message);

    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      loadExpenses();
    }
  }, [user]);

  const addExpense = async (e) => {
    e.preventDefault();
    const token = await getToken({ template: 'supabase' });

    const client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        global: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }
    );

    const { error } = await client.from('expenses').insert({
      title,
      amount: parseFloat(amount),
      category,
    });

    if (!error) {
      setTitle('');
      setAmount('');
      setCategory('');
      loadExpenses(); // Refresh after adding
    } else {
      console.error('Error adding expense:', error.message);
    }
  };

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-6">Your Expenses</h1>

      {loading ? (
        <p>Loading...</p>
      ) : expenses.length > 0 ? (
        <ul className="space-y-4 mb-8">
          {expenses.map((exp) => (
            <li
              key={exp.id}
              className="bg-[#1e293b] p-4 rounded-xl flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold">{exp.title}</h3>
                <p className="text-sm text-gray-400">{exp.category || 'Uncategorized'}</p>
              </div>
              <span className="text-green-400 font-semibold">${exp.amount}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No expenses yet.</p>
      )}

      <form
        onSubmit={addExpense}
        className="bg-[#1e293b] p-6 rounded-xl space-y-4 shadow-lg max-w-md"
      >
        <h2 className="text-xl font-semibold">Add New Expense</h2>
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
          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded font-semibold"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
}
