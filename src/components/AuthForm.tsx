"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Props = {
  type: "login" | "signup";
};

export default function AuthForm({ type }: Props) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (type === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) setError(error.message);
      else router.push("/dashboard");
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) setError(error.message);
      else router.push("/dashboard");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-200 px-4">
      {/* Glass Card */}
      <div className="w-full max-w-md backdrop-blur-xl bg-white/70 border border-gray-200 shadow-2xl rounded-2xl p-8">
        <h2 className="text-3xl font-semibold text-center mb-2 text-gray-800">
          {type === "login" ? "Welcome Back" : "Create Account"}
        </h2>

        <p className="text-center text-gray-500 mb-6">
          {type === "login"
            ? "Login to continue your DSA journey"
            : "Start tracking your DSA progress"}
        </p>

        <form onSubmit={handleAuth} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter your password"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-900 transition shadow-lg"
          >
            {loading
              ? "Please wait..."
              : type === "login"
              ? "Login"
              : "Create Account"}
          </button>
        </form>

        {error && <p className="text-red-500 text-center mt-3">{error}</p>}

        <p className="text-center mt-6 text-gray-600">
          {type === "login" ? (
            <>
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="text-black font-medium hover:underline"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-black font-medium hover:underline"
              >
                Login
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
