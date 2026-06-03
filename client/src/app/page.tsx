import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">

      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#0f172a,black)]" />

      {/* Glow Effects */}
      <div className="absolute left-1/4 top-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="absolute bottom-20 right-1/4 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

      {/* Navbar */}
      <nav className="relative z-20 flex items-center justify-between px-8 py-6">

        <h1 className="text-2xl font-bold tracking-wide text-white">
          QFlow
        </h1>

        <div className="flex items-center gap-4">

          <Link
            href="/login"
            className="rounded-xl border border-cyan-500/20 bg-slate-900/80 px-5 py-2 text-white backdrop-blur-md transition hover:bg-slate-800"
          >
            Login
          </Link>

          <button className="rounded-xl bg-cyan-500 px-5 py-2 font-medium text-black transition hover:scale-105">
            Get Started
          </button>

        </div>

      </nav>

      {/* Hero Section */}
      <section className="relative z-10 mx-auto flex min-h-[70vh] max-w-7xl flex-col items-center justify-center px-6 text-center">

        <Badge className="mb-6 border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-cyan-300">
          Real-Time Queue Intelligence
        </Badge>

        <h1 className="max-w-5xl text-5xl font-bold leading-tight md:text-7xl">
          Eliminate
          <span className="bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            {" "}Physical Waiting
          </span>
        </h1>

        <p className="mt-8 max-w-2xl text-lg text-gray-400">
          Smart queues, live tracking, QR check-ins, instant notifications,
          and seamless appointment management for modern businesses.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">

          <Link
            href="/queue"
            className="rounded-2xl bg-cyan-500 px-8 py-4 text-lg font-semibold text-black transition hover:scale-105"
          >
            Join Queue
          </Link>

          <Link
            href="/dashboard"
            className="rounded-2xl border border-cyan-500/20 bg-slate-900/80 px-8 py-4 text-lg text-white backdrop-blur-md transition hover:bg-slate-800"
          >
            View Dashboard
          </Link>

        </div>

      </section>

      {/* Floating Queue Cards */}
      <section className="relative z-10 mx-auto grid max-w-6xl gap-6 px-6 pb-32 md:grid-cols-3">

        <Card className="border border-cyan-500/20 bg-slate-900/80 p-6 backdrop-blur-xl">

          <div className="mb-4 flex items-center justify-between">

            <h2 className="text-lg font-semibold text-white">
              Current Queue
            </h2>

            <Badge className="bg-green-500/20 text-green-400">
              Live
            </Badge>

          </div>

          <p className="text-5xl font-bold text-cyan-400">
            24
          </p>

          <p className="mt-2 text-sm text-gray-400">
            Customers waiting
          </p>

        </Card>

        <Card className="border border-cyan-500/20 bg-slate-900/80 p-6 backdrop-blur-xl">

          <div className="mb-4 flex items-center justify-between">

            <h2 className="text-lg font-semibold text-white">
              Avg Wait Time
            </h2>

            <Badge className="bg-blue-500/20 text-blue-400">
              Smart ETA
            </Badge>

          </div>

          <p className="text-5xl font-bold text-blue-400">
            12m
          </p>

          <p className="mt-2 text-sm text-gray-400">
            Optimized using live queue flow
          </p>

        </Card>

        <Card className="border border-cyan-500/20 bg-slate-900/80 p-6 backdrop-blur-xl">

          <div className="mb-4 flex items-center justify-between">

            <h2 className="text-lg font-semibold text-white">
              Active Branches
            </h2>

            <Badge className="bg-purple-500/20 text-purple-400">
              Multi-Location
            </Badge>

          </div>

          <p className="text-5xl font-bold text-purple-400">
            08
          </p>

          <p className="mt-2 text-sm text-gray-400">
            Connected business centers
          </p>

        </Card>

      </section>

    </main>
  );
}