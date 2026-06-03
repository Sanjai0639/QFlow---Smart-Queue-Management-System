export default function DashboardPage() {

  return (
    <main className="min-h-screen bg-black px-12 py-10 ml-64 text-white">

      <h1 className="text-6xl font-bold">
        Dashboard
      </h1>

      <p className="mt-4 text-gray-400">
        Real-time queue analytics and business insights.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-3">

        <div className="rounded-3xl border border-cyan-500/20 bg-slate-900/80 p-8">

          <p className="text-gray-400">
            Active Queues
          </p>

          <h2 className="mt-5 text-5xl font-bold text-cyan-400">
            8
          </h2>

        </div>

        <div className="rounded-3xl border border-green-500/20 bg-slate-900/80 p-8">

          <p className="text-gray-400">
            Customers Today
          </p>

          <h2 className="mt-5 text-5xl font-bold text-green-400">
            124
          </h2>

        </div>

        <div className="rounded-3xl border border-yellow-500/20 bg-slate-900/80 p-8">

          <p className="text-gray-400">
            Average Wait Time
          </p>

          <h2 className="mt-5 text-5xl font-bold text-yellow-400">
            12 mins
          </h2>

        </div>

      </div>

    </main>
  );
}