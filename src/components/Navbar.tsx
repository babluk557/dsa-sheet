"use client";

import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setEmail(data.user.email || null);
      }
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-800">
      <div className="container flex justify-between items-center py-3">
        <Link href="/" className="text-xl font-bold tracking-wide">
          DSA Sheet
        </Link>
        <div className="flex items-center gap-4">
          {email && (
            <span className="hidden sm:block text-sm text-gray-600 dark:text-gray-300">
              {email}
            </span>
          )}

          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm rounded-lg bg-black text-white hover:opacity-80 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
