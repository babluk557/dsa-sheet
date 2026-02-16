"use client";

import Navbar from "@/components/Navbar";
import { ProgressProvider } from "@/context/ProgressContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.push("/login");
      }
    };

    checkUser();
  }, []);

  return (
    <ProgressProvider>
      <Navbar />
      {children}
    </ProgressProvider>
  );
}
