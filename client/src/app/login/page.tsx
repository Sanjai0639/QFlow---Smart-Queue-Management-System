"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import api from "@/lib/axios";

import { useAuthStore } from "@/store/authStore";

export default function LoginPage() {
  const router = useRouter();

  const { setToken } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {

      const response = await api.post("/auth/login", {
        email,
        password,
      });

      setToken(response.data.token);

      localStorage.setItem(
        "token",
        response.data.token
      );

      alert("Login successful");

      router.push("/dashboard");

    } catch (error) {
      console.log(error);

      alert("Login failed");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white">

      <div className="w-full max-w-md rounded-3xl border border-cyan-500/20 bg-slate-900/80 p-8 backdrop-blur-xl">

        <h1 className="mb-2 text-4xl font-bold">
          Welcome Back
        </h1>

        <p className="mb-8 text-gray-400">
          Login to continue managing your queues.
        </p>

        <div className="space-y-5">

          <div>
            <label className="mb-2 block text-sm text-gray-400">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full rounded-xl border border-cyan-500/20 bg-black/40 px-4 py-3 outline-none transition focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-400">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full rounded-xl border border-cyan-500/20 bg-black/40 px-4 py-3 outline-none transition focus:border-cyan-400"
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full rounded-xl bg-cyan-500 py-3 font-semibold text-black transition hover:scale-[1.02]"
          >
            Login
          </button>

        </div>

      </div>

    </main>
  );
}