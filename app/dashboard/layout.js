// dashboard/layout.js
export default function DashboardLayout({ children }) {
    return (
      <div className="flex h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] mt-15 text-white">
        {/* Sidebar */}
        <aside className="w-64 bg-[#111827] p-6 hidden md:block">
          <h2 className="text-2xl font-bold mb-8">FinSage</h2>
          <nav className="space-y-4">
            <a href="/dashboard" className="block hover:text-purple-400">Dashboard</a>
            <a href="/dashboard/add-expense" className="block hover:text-purple-400">Add Expense</a>
            <a href="#" className="block hover:text-purple-400">Budget</a>
            <a href="#" className="block hover:text-purple-400">Settings</a>
          </nav>
        </aside>
  
        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    );
  }
  