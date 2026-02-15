"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">DSA Sheet</h1>

      <div className="space-x-4">
        <Link href="/login" className="hover:text-gray-300">
          Login
        </Link>
        <Link
          href="/signup"
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          Signup
        </Link>
      </div>
    </nav>
  );
}
