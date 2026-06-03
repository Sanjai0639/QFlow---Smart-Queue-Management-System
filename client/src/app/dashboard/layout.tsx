import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen bg-black text-white">

      {/* Sidebar */}
      <aside className="w-72 border-r border-cyan-500/20 bg-slate-950/80 p-6">

        <h1 className="mb-10 text-3xl font-bold text-cyan-400">
          QFlow
        </h1>

        <nav className="space-y-4">

          <Link
            href="/dashboard"
            className="block rounded-xl px-4 py-3 transition hover:bg-slate-800"
          >
            Dashboard
          </Link>

          <Link
            href="/dashboard/queues"
            className="block rounded-xl px-4 py-3 transition hover:bg-slate-800"
          >
            Queues
          </Link>

          <Link
            href="/dashboard/customers"
            className="block rounded-xl px-4 py-3 transition hover:bg-slate-800"
          >
            Customers
          </Link>

          <Link
            href="/dashboard/settings"
            className="block rounded-xl px-4 py-3 transition hover:bg-slate-800"
          >
            Settings
          </Link>

        </nav>

      </aside>

      {/* Main Content */}
      <section className="flex-1 p-10">
        {children}
      </section>

    </main>
  );
}