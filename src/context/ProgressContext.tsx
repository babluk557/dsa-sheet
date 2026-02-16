"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type ProgressContextType = {
  completed: string[];
  toggleComplete: (problemId: string) => void;
};

const ProgressContext = createContext<ProgressContextType | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    fetchProgress();
  }, []);

  async function fetchProgress() {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return;

    const { data, error } = await supabase
      .from("user_progress")
      .select("problem_id")
      .eq("user_id", userData.user.id);

    if (!error && data) {
      setCompleted(data.map((item) => item.problem_id));
    }
  }

  async function toggleComplete(problemId: string) {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return;

    const userId = userData.user.id;

    const alreadyCompleted = completed.includes(problemId);

    if (alreadyCompleted) {
      await supabase
        .from("user_progress")
        .delete()
        .eq("user_id", userId)
        .eq("problem_id", problemId);

      setCompleted((prev) => prev.filter((id) => id !== problemId));
    } else {
      await supabase.from("user_progress").insert({
        user_id: userId,
        problem_id: problemId,
      });

      setCompleted((prev) => [...prev, problemId]);
    }
  }

  return (
    <ProgressContext.Provider value={{ completed, toggleComplete }}>
      {children}
    </ProgressContext.Provider>
  );
}

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used inside ProgressProvider");
  }
  return context;
};
