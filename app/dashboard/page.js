"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export default function Dashboard() {
  const { user, isSignedIn } = useUser();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const supabase = createClientComponentClient(); // ✅ Correct client setup for App Router

  useEffect(() => {
    if (!isSignedIn || !user?.id) return;

    const fetchExpenses = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("expenses")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false }); // ✅ Use created_at unless you made a date field

      if (error) {
        console.error("Failed to fetch expenses:", error.message);
      } else {
        setExpenses(data);
      }

      setLoading(false);
    };

    fetchExpenses();
  }, [isSignedIn, user, supabase]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Your Expenses
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between">
          <Button onClick={() => router.push("/dashboard/add-expense")}>
            + Add Expense
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          {loading ? (
            <p className="text-center text-gray-500">Loading expenses...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenses.length > 0 ? (
                  expenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell>{expense.category}</TableCell>
                      <TableCell>{expense.description}</TableCell>
                      <TableCell>${expense.amount}</TableCell>
                      <TableCell>
                        {new Date(expense.created_at).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan="4" className="text-center text-gray-500">
                      No expenses found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
