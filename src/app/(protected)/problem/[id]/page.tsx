"use client";

import { useParams } from "next/navigation";
import { dsaSheet } from "@/data/dsaSheet";
import BackButton from "@/components/BackButton";
import { useProgress } from "@/context/ProgressContext";

export default function ProblemPage() {
  const params = useParams();

  const { completed, toggleComplete } = useProgress();

  const problem = dsaSheet
    .flatMap((t) => t.problems)
    .find((p) => p.id === params.id);

  if (!problem) return <div>Not found</div>;

  const isDone = completed.includes(problem.id);

  return (
    <div className="container py-6">
      <BackButton />

      <div className="card">
        <h1 className="text-2xl font-bold mb-2">{problem.title}</h1>

        <span className="inline-block mb-4 px-3 py-1 bg-gray-200 rounded text-sm">
          {problem.difficulty}
        </span>

        {/* Problem Description */}
        <div className="mb-6">
          <h2 className="font-semibold mb-2">Problem Description</h2>

          <p className="text-gray-700 leading-relaxed">{problem.description}</p>
        </div>

        {/* Links */}
        <div className="flex gap-3 mb-6">
          <a href={problem.youtube} target="_blank" className="button-primary">
            Watch Video
          </a>

          <a href={problem.leetcode} target="_blank" className="button-primary">
            Solve on LeetCode
          </a>

          <a href={problem.article} target="_blank" className="button-primary">
            Read Article
          </a>
        </div>
        {/* Completion Section */}
        <div className="mt-6 border-t pt-6">
          <button
            onClick={() => toggleComplete(problem.id)}
            className={`flex items-center gap-3 px-5 py-3 rounded-lg transition-all duration-200
    ${
      isDone
        ? "bg-green-100 border border-green-500 text-green-700"
        : "bg-gray-100 border border-gray-300 hover:bg-gray-200"
    }`}
          >
            <div
              className={`w-6 h-6 flex items-center justify-center rounded border
      ${
        isDone ? "bg-green-500 border-green-500 text-white" : "border-gray-400"
      }`}
            >
              {isDone ? "✓" : ""}
            </div>

            <span className="font-medium">
              {isDone ? "Completed" : "Mark as Completed"}
            </span>
          </button>

          {isDone && (
            <p className="text-sm text-green-600 mt-2">
              Great job! This problem is marked as completed.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
