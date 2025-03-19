import { UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <header className="p-4 bg-white shadow flex justify-between items-center">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <UserButton />
    </header>
  );
}
