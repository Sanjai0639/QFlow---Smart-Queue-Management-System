"use client";

import { useEffect, useState } from "react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

interface Queue {
  id: string;
  name: string;
  currentToken: number;
  estimatedWait?: number;
}

export default function QueuesPage() {

  const [queues, setQueues] = useState<Queue[]>([]);
  const [queueName, setQueueName] = useState("");

  // FETCH QUEUES DATA
  const getQueuesData = async () => {

    try {

      const response = await fetch(
        `${API_URL}/queue/all`
      );

      return await response.json();

    } catch (error) {

      console.log(error);
      return [];

    }

  };

  const fetchQueues = async () => {
    const data = await getQueuesData();
    setQueues(data);
  };

  // CREATE QUEUE
  const createQueue = async () => {

    if (!queueName) return;

    try {

      const token = localStorage.getItem("token");

      await fetch(`${API_URL}/queue/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: queueName,
        }),
      });

      setQueueName("");

      fetchQueues();

    } catch (error) {

      console.log(error);

    }

  };

  // JOIN QUEUE
  const joinQueue = async (queueId: string) => {

    try {

      const token = localStorage.getItem("token");

      await fetch(
        `${API_URL}/queue/join/${queueId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchQueues();

    } catch (error) {

      console.log(error);

    }

  };

  // RESET QUEUE
  const resetQueue = async (queueId: string) => {

    try {

      const token = localStorage.getItem("token");

      await fetch(
        `${API_URL}/queue/reset/${queueId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchQueues();

    } catch (error) {

      console.log(error);

    }

  };

  // DELETE QUEUE
  const deleteQueue = async (queueId: string) => {

    try {

      const token = localStorage.getItem("token");

      await fetch(
        `${API_URL}/queue/delete/${queueId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchQueues();

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    let active = true;

    getQueuesData().then((data) => {
      if (active) {
        setQueues(data);
      }
    });

    return () => {
      active = false;
    };

  }, []);

  return (

    <main className="min-h-screen bg-black px-12 py-10 ml-64 text-white">

      <h1 className="text-6xl font-bold">
        Queue Management
      </h1>

      <p className="mt-4 text-gray-400">
        Create, join and manage realtime queues.
      </p>

      {/* CREATE QUEUE */}
      <div className="mt-10 rounded-3xl border border-cyan-500/20 bg-slate-900/80 p-8 max-w-2xl">

        <h2 className="text-3xl font-bold">
          Create Queue
        </h2>

        <input
          type="text"
          placeholder="Queue name"
          value={queueName}
          onChange={(e) => setQueueName(e.target.value)}
          className="mt-6 w-full rounded-xl border border-cyan-500/20 bg-black p-4 outline-none"
        />

        <button
          onClick={createQueue}
          className="mt-6 rounded-xl bg-cyan-500 px-8 py-4 font-bold text-black"
        >
          Create Queue
        </button>

      </div>

      {/* QUEUES */}
      <div className="mt-10 grid gap-6 md:grid-cols-2">

        {queues.map((queue) => (

          <div
            key={queue.id}
            className="rounded-3xl border border-cyan-500/20 bg-slate-900/80 p-8"
          >

            <h2 className="text-3xl font-bold text-cyan-400">
              {queue.name}
            </h2>

            <p className="mt-6 text-gray-400">
              Current Token
            </p>

            <h3 className="mt-2 text-5xl font-bold">
              {queue.currentToken}
            </h3>

            <p className="mt-6 text-yellow-400 text-2xl font-bold">
              ETA: {queue.currentToken * 5} mins
            </p>

            <div className="mt-8 flex flex-wrap gap-4">

              <button
                onClick={() => joinQueue(queue.id)}
                className="rounded-xl bg-cyan-500 px-6 py-3 font-bold text-black"
              >
                Join Queue
              </button>

              <button
                onClick={() => resetQueue(queue.id)}
                className="rounded-xl bg-yellow-500 px-6 py-3 font-bold text-black"
              >
                Reset
              </button>

              <button
                onClick={() => deleteQueue(queue.id)}
                className="rounded-xl bg-red-500 px-6 py-3 font-bold text-white"
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