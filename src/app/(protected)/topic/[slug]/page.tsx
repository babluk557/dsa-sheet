"use client";

import BackButton from "@/components/BackButton";
import { dsaSheet } from "@/data/dsaSheet";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function TopicPage() {
  const params = useParams();

  const topic = dsaSheet.find((t) => t.slug === params.slug);

  if (!topic) return <div className="container py-6">Not found</div>;

  return (
    <div className="container py-6">
      <BackButton />

      <div className="card">
        <h1 className="text-2xl font-bold mb-4">{topic.title}</h1>

        <div className="space-y-2">
          {topic.problems.map((problem) => (
            <Link
              key={problem.id}
              href={`/problem/${problem.id}`}
              className="
                block
                border
                p-4
                rounded-lg
                hover:bg-gray-100
                dark:hover:bg-gray-800
                transition
                cursor-pointer
              "
            >
              {problem.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
