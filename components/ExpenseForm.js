'use client';

import { useEffect, useState } from 'react';
import { useUser, useAuth } from '@clerk/nextjs';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function ExpenseForm() {
  const { user } = useUser();
  const { getToken } = useAuth();

  const [supabase, setSupabase] = useState(null);
  const [amount, setAmount] = useState('');
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 👇 create supabase client with Clerk token
  useEffect(() => {
    const init = async () => {
      const token = await getToken({ template: 'supabase' });

      const client = createClientComponentClient({
        options: {
          global: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        },
      });

      setSupabase(client);
    };

    init();
  }, [getToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.id || !supabase) return;

    setLoading(true);
    setError('');

    const { error } = await supabase.from('expenses').insert({
      user_id: user.id, // Clerk user ID
      amount: parseFloat(amount),
      description: desc,
      category,
    });

    if (error) {
      console.error(error.message);
      setError('Failed to add expense.');
    } else {
      setAmount('');
      setDesc('');
      setCategory('');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded space-y-4">
      {error && <p className="text-red-500">{error}</p>}

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="text"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Description"
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
        className="w-full border p-2 rounded"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white w-full py-2 rounded disabled:opacity-50"
      >
        {loading ? 'Adding...' : 'Add Expense'}
      </button>
    </form>
  );
}
