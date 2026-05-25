"use client";

import { useEffect, useState } from "react";

interface CompletionButtonProps {
  slug: string;
  type: "lesson" | "problem";
}

export function CompletionButton({ slug, type }: CompletionButtonProps) {
  const [mounted, setMounted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const storageKey = type === "lesson" ? "completed_lessons" : "completed_problems";

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const completedList = JSON.parse(localStorage.getItem(storageKey) || "[]");
      setIsCompleted(completedList.includes(slug));
    }
  }, [slug, storageKey]);

  if (!mounted) {
    return (
      <div
        style={{
          height: "40px",
          width: "180px",
          background: "var(--panel-subtle)",
          borderRadius: "6px",
          border: "1px solid var(--border)",
        }}
      />
    );
  }

  function handleToggle() {
    if (typeof window === "undefined") return;

    const completedList = JSON.parse(localStorage.getItem(storageKey) || "[]");

    if (completedList.includes(slug)) {
      const filtered = completedList.filter((item: string) => item !== slug);
      localStorage.setItem(storageKey, JSON.stringify(filtered));
      setIsCompleted(false);
    } else {
      completedList.push(slug);
      localStorage.setItem(storageKey, JSON.stringify(completedList));
      setIsCompleted(true);

      // Update streak
      const todayStr = new Date().toDateString();
      const lastActiveStr = localStorage.getItem("last_active_date");
      let streak = parseInt(localStorage.getItem("streak_count") || "0");

      if (!lastActiveStr) {
        streak = 1;
      } else {
        const lastActive = new Date(lastActiveStr);
        const today = new Date(todayStr);
        const diffDays = Math.floor((today.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays === 1) streak += 1;
        else if (diffDays > 1) streak = 1;
      }
      localStorage.setItem("last_active_date", todayStr);
      localStorage.setItem("streak_count", streak.toString());
    }
  }

  return (
    <button
      onClick={handleToggle}
      style={{
        background: isCompleted ? "var(--accent)" : "var(--panel-subtle)",
        border: `1px solid ${isCompleted ? "var(--accent)" : "var(--border)"}`,
        borderRadius: "6px",
        color: isCompleted ? "white" : "var(--foreground)",
        padding: "10px 20px",
        fontSize: "13px",
        fontWeight: 700,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "6px",
        transition: "all 200ms ease",
        whiteSpace: "nowrap",
      }}
      type="button"
    >
      {isCompleted ? (
        <>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7L5.5 10.5L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Đã hoàn thành
        </>
      ) : (
        "Đánh dấu hoàn thành"
      )}
    </button>
  );
}
