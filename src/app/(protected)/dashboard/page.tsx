"use client";

import { dsaSheet } from "@/data/dsaSheet";
import Link from "next/link";
import { useProgress } from "@/context/ProgressContext";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Dashboard() {
  const { completed } = useProgress();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setEmail(data.user?.email ?? null);
    };
    getUser();
  }, []);

  const totalProblems = dsaSheet.reduce((acc, t) => acc + t.problems.length, 0);

  const progress = Math.round((completed.length / totalProblems) * 100);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome back 👋</h1>
        <p className="text-gray-500">{email}</p>
        <p className="text-gray-600 mt-2">
          Track your DSA preparation progress and stay consistent.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border">
          <p className="text-gray-500">Total Problems</p>
          <h2 className="text-2xl font-bold">{totalProblems}</h2>
        </div>

        <div className="bg-white p-6 rounded-xl border">
          <p className="text-gray-500">Completed</p>
          <h2 className="text-2xl font-bold text-green-600">
            {completed.length}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl border">
          <p className="text-gray-500">Remaining</p>
          <h2 className="text-2xl font-bold text-red-500">
            {totalProblems - completed.length}
          </h2>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border mb-10">
        <h2 className="text-xl font-semibold mb-2">Overall Progress</h2>

        <p className="text-gray-500 mb-4">
          This progress bar shows how much of the DSA sheet you have completed
          so far.
        </p>

        <div className="w-full bg-gray-200 h-4 rounded">
          <div
            className="bg-blue-600 h-4 rounded transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mt-2 font-semibold">{progress}% completed</p>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-2">Topics</h2>

        <p className="text-gray-500 mb-6">
          Click on any topic to solve problems and track your progress for that
          specific category.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {dsaSheet.map((topic) => {
            const total = topic.problems.length;

            const completedCount = topic.problems.filter((p) =>
              completed.includes(p.id)
            ).length;

            const topicProgress = Math.round((completedCount / total) * 100);

            return (
              <Link
                key={topic.slug}
                href={`/topic/${topic.slug}`}
                className="bg-white p-6 rounded-xl border hover:shadow-md transition"
              >
                <h3 className="font-semibold text-lg mb-2">{topic.title}</h3>

                <p className="text-sm text-gray-500 mb-3">
                  {completedCount} / {total} completed
                </p>

                <div className="w-full bg-gray-200 h-2 rounded">
                  <div
                    className="bg-blue-600 h-2 rounded"
                    style={{ width: `${topicProgress}%` }}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
