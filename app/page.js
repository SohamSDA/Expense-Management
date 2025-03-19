"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const { isSignedIn } = useUser();

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
      <Card className="w-[400px] p-6 shadow-xl border border-gray-800">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Expense Tracker
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-400">Track your expenses effortlessly.</p>
          <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
            <Button className="w-full mt-4">Get Started</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
