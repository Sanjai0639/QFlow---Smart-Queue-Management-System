export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#0f172a,black)]" />
      <div className="absolute left-1/3 top-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="relative z-10 w-full max-w-md rounded-3xl border border-cyan-500/20 bg-slate-900/80 p-8 backdrop-blur-xl">

        <h1 className="mb-2 text-4xl font-bold">
          Create Account
        </h1>

        <p className="mb-8 text-gray-400">
          Start managing queues smarter with QFlow.
        </p>

        <form className="space-y-5">

          <div>
            <label className="mb-2 block text-sm text-gray-400">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              className="w-full rounded-xl border border-cyan-500/20 bg-black/40 px-4 py-3 outline-none transition focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-400">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-xl border border-cyan-500/20 bg-black/40 px-4 py-3 outline-none transition focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-400">
              Password
            </label>

            <input
              type="password"
              placeholder="Create password"
              className="w-full rounded-xl border border-cyan-500/20 bg-black/40 px-4 py-3 outline-none transition focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-400">
              Role
            </label>

            <select
              className="w-full rounded-xl border border-cyan-500/20 bg-black/40 px-4 py-3 outline-none transition focus:border-cyan-400"
            >
              <option>Customer</option>
              <option>Business Owner</option>
            </select>
          </div>

          <button
            className="w-full rounded-xl bg-cyan-500 py-3 font-semibold text-black transition hover:scale-[1.02]"
          >
            Create Account
          </button>

        </form>

      </div>

    </main>
  );
}