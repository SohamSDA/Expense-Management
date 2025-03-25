import ExpenseForm from '@/components/ExpenseForm';
import ExpenseList from '@/components/ExpenseList';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AddExpensePage() {
  return (
    <main className="max-w-xl mx-auto py-10 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Add a New Expense</CardTitle>
        </CardHeader>
        <CardContent>
          <ExpenseForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Your Recent Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <ExpenseList />
        </CardContent>
      </Card>
    </main>
  );
}
