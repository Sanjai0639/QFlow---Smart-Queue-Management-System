"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

const links = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Queues",
    href: "/dashboard/queues",
  },
  {
    name: "Customers",
    href: "/dashboard/customers",
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
  },
];

export default function DashboardSidebar() {

  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col border-r border-cyan-500/20 bg-black/95 px-6 py-8">

      {/* LOGO */}
      <Link href="/">

        <h1 className="cursor-pointer text-5xl font-bold text-cyan-400 transition hover:text-cyan-300">
          QFlow
        </h1>

      </Link>

      {/* NAVIGATION */}
      <nav className="mt-16 flex flex-col gap-4">

        {links.map((link) => (

          <Link
            key={link.name}
            href={link.href}
            className={`rounded-xl px-4 py-3 text-lg transition ${
              pathname === link.href
                ? "bg-cyan-500 text-black"
                : "text-white hover:bg-white/10"
            }`}
          >
            {link.name}
          </Link>

        ))}

      </nav>

    </aside>
  );
}