import { createServerSupabaseClient } from './client';
import AddExpenseForm from '../dashboard/add-expense/page';

export default async function Home() {
  const client = createServerSupabaseClient();

  const { data, error } = await client
    .from('expenses')
    .select()
    .order('created_at', { ascending: false });

  if (error) throw error;

  const expenses = data;

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-6">Your Expenses (SSR)</h1>

      {expenses.length > 0 ? (
        <ul className="space-y-4 mb-8">
          {expenses.map((exp) => (
            <li key={exp.id} className="bg-[#1e293b] p-4 rounded-xl flex justify-between items-center">
              <div>
                <h3 className="font-bold">{exp.title}</h3>
                <p className="text-sm text-gray-400">{exp.category || 'Uncategorized'}</p>
              </div>
              <span className="text-green-400 font-semibold">${exp.amount}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No expenses found.</p>
      )}

      <AddExpenseForm />
    </div>
  );
}
