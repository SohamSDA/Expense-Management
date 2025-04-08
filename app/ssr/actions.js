// app/ssr/actions.js
'use server';

import { createServerSupabaseClient } from './client';

export async function addExpense({ title, amount, category }) {
  const client = await createServerSupabaseClient();

  const { error } = await client.from('expenses').insert({
    title,
    amount,
    category,
  });

  if (error) {
    console.error('Error adding expense:', error.message);
    throw new Error('Failed to add expense');
  }

  return { success: true };
}
