"use client";

import Link from "next/link";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="w-full fixed top-0 left-0 z-50  ">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div>
       
        {/* Logo */}
        <h1 className="text-3xl font-bold text-white">
          <Link href="/">FinSage</Link>
        </h1>
        </div>
      

        {/* Auth */}
        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton>
              <Button variant="outline" className="text-white bg-transparent border-white hover:bg-white/10 hover:text-white">
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
