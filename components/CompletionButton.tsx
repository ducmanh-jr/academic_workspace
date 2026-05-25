"use client";

import { useEffect, useRef, useState } from "react";

interface CompletionButtonProps {
  slug: string;
  type: "lesson" | "problem";
}

/* ── DOM-based Confetti Burst ── */
function spawnConfetti(origin: HTMLElement) {
  const colors = ["#14b8a6", "#f59e0b", "#ef4444", "#8b5cf6", "#3b82f6", "#ec4899", "#10b981"];
  const count = 60;

  const rect = origin.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  for (let i = 0; i < count; i++) {
    const dot = document.createElement("div");
    const size = Math.random() * 8 + 4;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 260 + 120;
    const dx = Math.cos(angle) * velocity;
    const dy = Math.sin(angle) * velocity - 80; // bias upward
    const spin = (Math.random() - 0.5) * 720;

    Object.assign(dot.style, {
      position: "fixed",
      left: `${cx}px`,
      top: `${cy}px`,
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: Math.random() > 0.4 ? "50%" : "2px",
      background: color,
      pointerEvents: "none",
      zIndex: "10000",
      opacity: "1",
    });

    document.body.appendChild(dot);

    const duration = 900 + Math.random() * 500;
    const start = performance.now();

    function frame(now: number) {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      // easeOutQuad
      const ease = 1 - (1 - t) * (1 - t);

      const x = cx + dx * ease;
      const y = cy + dy * ease + 400 * t * t; // gravity
      const opacity = 1 - t * t;
      const rotate = spin * ease;

      dot.style.transform = `translate(${x - cx}px, ${y - cy}px) rotate(${rotate}deg)`;
      dot.style.opacity = `${opacity}`;

      if (t < 1) {
        requestAnimationFrame(frame);
      } else {
        dot.remove();
      }
    }

    requestAnimationFrame(frame);
  }
}

export function CompletionButton({ slug, type }: CompletionButtonProps) {
  const [mounted, setMounted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

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

      // 🎉 Fire confetti!
      if (buttonRef.current) {
        spawnConfetti(buttonRef.current);
      }

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
      ref={buttonRef}
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
