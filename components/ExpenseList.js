'use client';

import { useEffect, useState } from 'react';
import { useUser, useAuth } from '@clerk/nextjs';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function ExpenseList() {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [supabase, setSupabase] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

 
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

  // 👇 Fetch expenses
  useEffect(() => {
    if (!supabase || !user) return;

    const fetchExpenses = async () => {
      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (!error) {
        setExpenses(data);
      }

      setLoading(false);
    };

    fetchExpenses();
  }, [supabase, user]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="space-y-2">
      {expenses.length === 0 ? (
        <p className="text-gray-500">No expenses found.</p>
      ) : (
        expenses.map((expense) => (
          <div key={expense.id} className="border p-2 rounded shadow-sm">
            <p className="font-semibold">{expense.category}</p>
            <p>{expense.description}</p>
            <p>${expense.amount}</p>
            <p className="text-xs text-gray-400">{new Date(expense.created_at).toLocaleDateString()}</p>
          </div>
        ))
      )}
    </div>
  );
}
