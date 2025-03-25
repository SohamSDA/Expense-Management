import Link from "next/link";
import { Home, Wallet, Settings, LogOut } from "lucide-react";
import { SignedIn, UserButton, SignOutButton } from "@clerk/nextjs";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white h-screen p-4 flex flex-col">
      <h2 className="text-2xl font-bold mb-6">Expense Tracker</h2>

      <nav className="flex-1">
        <ul>
          <li className="mb-4">
            <Link href="/dashboard" className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded">
              <Home size={20} /> Overview
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/dashboard/add-expense" className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded">
              <Wallet size={20} /> Add Expense
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/dashboard/settings" className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded">
              <Settings size={20} /> Settings
            </Link>
          </li>
        </ul>
      </nav>

      <SignedIn>
        <div className="mt-auto flex items-center gap-2">
          <UserButton />
          <SignOutButton>
            <button className="flex items-center gap-2 text-red-400 hover:text-red-500">
              <LogOut size={20} /> Logout
            </button>
          </SignOutButton>
        </div>
      </SignedIn>
    </aside>
  );
}
