import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <nav className="p-4 bg-gray-900 shadow-md flex justify-between items-center text-white">
      <Link href="/" className="text-2xl font-bold">Expense Tracker</Link>
      <div>
        <SignedOut>
          <Link href="/sign-in">
            <Button className="mr-4 border-gray-500 text-gray-300 hover:bg-gray-800 cursor-pointer">
              Login
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button className="bg-blue-600 hover:bg-blue-700 cursor-pointer">Sign Up</Button>
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
