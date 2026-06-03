"use client";

import { useEffect, useState } from "react";

import api from "@/lib/axios";

import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

interface Queue {
  id: string;
  name: string;
  currentToken: number;
  estimatedWait?: number;
  createdAt?: string;
}

export default function QueuesPage() {

  const [queueName, setQueueName] = useState("");

  const [queues, setQueues] = useState<Queue[]>([]);

  const [joinedToken, setJoinedToken] =
    useState<number | null>(null);

  // FETCH ALL QUEUES
  const fetchQueues = async () => {
    try {

      const response = await api.get("/queue/all");

      setQueues(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  // CREATE QUEUE
  const createQueue = async () => {
    try {

      const token = localStorage.getItem("token");

      await api.post(
        "/queue/create",
        {
          name: queueName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setQueueName("");

      fetchQueues();

    } catch (error) {
      console.log(error);

      alert("Failed to create queue");
    }
  };

  // JOIN QUEUE
  const joinQueue = async (queueId: string) => {
    try {

      const token = localStorage.getItem("token");

      const response = await api.post(
        `/queue/join/${queueId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setJoinedToken(
        response.data.tokenNumber
      );

      alert(
        `Joined Queue Successfully. Your token is ${response.data.tokenNumber}`
      );

      fetchQueues();

    } catch (error) {
      console.log(error);

      alert("Failed to join queue");
    }
  };

  // DELETE QUEUE
  const deleteQueue = async (queueId: string) => {
    try {

      const token = localStorage.getItem("token");

      await api.delete(
        `/queue/delete/${queueId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Queue deleted");

      fetchQueues();

    } catch (error) {
      console.log(error);

      alert("Failed to delete queue");
    }
  };

  // RESET QUEUE
  const resetQueue = async (queueId: string) => {
    try {

      const token = localStorage.getItem("token");

      await api.patch(
        `/queue/reset/${queueId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Queue reset");

      fetchQueues();

    } catch (error) {
      console.log(error);

      alert("Failed to reset queue");
    }
  };

  // REALTIME SOCKET
  useEffect(() => {

    const load = async () => {
      await fetchQueues();
    };
    load();

    socket.on("queueUpdated", () => {
      load();
    });

    return () => {
      socket.off("queueUpdated");
    };

  }, []);

  return (
    <main className="min-h-screen bg-black p-10 text-white">

      <h1 className="text-5xl font-bold">
        Queue Management
      </h1>

      <p className="mt-4 text-gray-400">
        Create, join and manage realtime queues.
      </p>

      {/* CREATE QUEUE */}
      <div className="mt-10 max-w-xl rounded-3xl border border-cyan-500/20 bg-slate-900/80 p-6">

        <h2 className="mb-6 text-2xl font-semibold">
          Create Queue
        </h2>

        <input
          type="text"
          placeholder="Queue name"
          value={queueName}
          onChange={(e) =>
            setQueueName(e.target.value)
          }
          className="w-full rounded-xl border border-cyan-500/20 bg-black/40 px-4 py-3 outline-none focus:border-cyan-400"
        />

        <button
          onClick={createQueue}
          className="mt-5 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black transition hover:scale-105"
        >
          Create Queue
        </button>

      </div>

      {/* TOKEN CARD */}
      {joinedToken && (

        <div className="mt-10 max-w-md rounded-3xl border border-green-500/20 bg-green-500/10 p-6">

          <p className="text-gray-300">
            Your Queue Token
          </p>

          <h2 className="mt-3 text-7xl font-bold text-green-400">
            {joinedToken}
          </h2>

        </div>

      )}

      {/* QUEUE LIST */}
      <div className="mt-10 grid gap-6 md:grid-cols-2">

        {queues.map((queue) => (

          <div
            key={queue.id}
            className="rounded-3xl border border-cyan-500/20 bg-slate-900/80 p-6"
          >

            <h2 className="text-2xl font-bold text-cyan-400">
              {queue.name}
            </h2>

            <p className="mt-4 text-gray-400">
              Current Token
            </p>

            <h3 className="mt-2 text-5xl font-bold">
              {queue.currentToken}
            </h3>

            <div className="mt-6 flex flex-wrap gap-3">

              <button
                onClick={() => joinQueue(queue.id)}
                className="rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-black transition hover:scale-105"
              >
                Join Queue
              </button>

              <button
                onClick={() => resetQueue(queue.id)}
                className="rounded-xl bg-yellow-500 px-5 py-3 font-semibold text-black transition hover:scale-105"
              >
                Reset
              </button>

              <button
                onClick={() => deleteQueue(queue.id)}
                className="rounded-xl bg-red-500 px-5 py-3 font-semibold text-white transition hover:scale-105"
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </main>
  );
}