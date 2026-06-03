export default function CustomersPage() {

  return (
    <main className="min-h-screen bg-black p-10 pl-80 text-white">

      <h1 className="text-6xl font-bold">
        Customers
      </h1>

      <p className="mt-4 text-gray-400">
        View customer queue activity.
      </p>

      <div className="mt-12 space-y-6">

        <div className="rounded-3xl border border-cyan-500/20 bg-slate-900/80 p-8">

          <h2 className="text-2xl font-bold text-cyan-400">
            Sanjai
          </h2>

          <p className="mt-3 text-gray-400">
            Queue Token: 12
          </p>

        </div>

        <div className="rounded-3xl border border-cyan-500/20 bg-slate-900/80 p-8">

          <h2 className="text-2xl font-bold text-cyan-400">
            Rahul
          </h2>

          <p className="mt-3 text-gray-400">
            Queue Token: 5
          </p>

        </div>

      </div>

    </main>
  );
}