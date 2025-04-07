'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addExpense } from '../../ssr/actions';

export default function AddExpenseForm() {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const router = useRouter();

  async function onSubmit(e) {
    e.preventDefault();
    await addExpense({ title, amount: parseFloat(amount), category });
    setTitle('');
    setAmount('');
    setCategory('');
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="bg-[#1e293b] p-6 rounded-xl space-y-4 shadow-lg max-w-md">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full px-4 py-2 bg-[#111827] border border-gray-700 rounded"
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
        className="w-full px-4 py-2 bg-[#111827] border border-gray-700 rounded"
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full px-4 py-2 bg-[#111827] border border-gray-700 rounded"
      />
      <button type="submit" className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded font-semibold">
        Add Expense
      </button>
    </form>
  );
}
