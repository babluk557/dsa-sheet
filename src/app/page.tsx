import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      <h1 className="text-4xl font-bold mb-4">
        Master DSA with Structured Sheet
      </h1>

      <p className="text-gray-600 max-w-xl">
        Track your Data Structures & Algorithms progress. Solve questions
        topic-wise and become interview ready.
      </p>

      <div className="mt-6 space-x-4">
        <a
          href="/signup"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Get Started
        </a>

        <a
          href="/login"
          className="border border-black px-6 py-3 rounded-lg hover:bg-black hover:text-white"
        >
          Login
        </a>
      </div>
    </div>
  );
}
