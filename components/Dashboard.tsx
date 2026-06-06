"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { lessons } from "@/lib/lessons";
import { classicProblems } from "@/lib/classic-problems";
import styles from "./Dashboard.module.css";

const reviewSignals = [
  "Ôn lại bài có độ khó cao sau 48 giờ",
  "Ghi 3 dong note sau moi lesson",
  "Biến 1 khái niệm thành ví dụ đời thường",
];

export function Dashboard() {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [completedProblems, setCompletedProblems] = useState<string[]>([]);

  useEffect(() => {
    setCompletedLessons(JSON.parse(localStorage.getItem("completed_lessons") || "[]"));
    setCompletedProblems(JSON.parse(localStorage.getItem("completed_problems") || "[]"));
  }, []);

  const lessonPct = Math.round((completedLessons.length / Math.max(lessons.length, 1)) * 100);
  const problemPct = Math.round((completedProblems.length / Math.max(classicProblems.length, 1)) * 100);
  const overallPct = Math.round((lessonPct * 0.65) + (problemPct * 0.35));

  const nextLesson = useMemo(() => {
    return lessons.find((lesson) => !completedLessons.includes(lesson.slug)) ?? lessons[0];
  }, [completedLessons]);

  const nextProblem = useMemo(() => {
    return classicProblems.find((problem) => !completedProblems.includes(problem.slug)) ?? classicProblems[0];
  }, [completedProblems]);

  const circumference = 2 * Math.PI * 31;
  const dashOffset = circumference - (overallPct / 100) * circumference;

  return (
    <section className={styles.wrapper} aria-label="Learning dashboard">
      <div className={styles.topRow}>
        <div className={styles.ringWrap} aria-label={`${overallPct}% overall progress`}>
          <svg className={styles.ring} viewBox="0 0 72 72" aria-hidden="true">
            <circle className={styles.ringTrack} cx="36" cy="36" r="31" />
            <circle
              className={styles.ringFill}
              cx="36"
              cy="36"
              r="31"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
            />
          </svg>
          <div className={styles.ringLabel}>
            <span className={styles.ringPct}>{overallPct}%</span>
            <span className={styles.ringSub}>mastery</span>
          </div>
        </div>

        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{completedLessons.length}</span>
            <span className={styles.statTotal}>/{lessons.length}</span>
            <span className={styles.statLabel}>Lessons</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statValue}>{completedProblems.length}</span>
            <span className={styles.statTotal}>/{classicProblems.length}</span>
            <span className={styles.statLabel}>Problems</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statValue}>5</span>
            <span className={styles.statTotal}>modes</span>
            <span className={styles.statLabel}>Workspace</span>
          </div>
        </div>
      </div>

      <div className={styles.actionGrid}>
        <Link className={styles.actionCard} href={`/lessons/${nextLesson.slug}`}>
          <span>Continue</span>
          <strong>{nextLesson.title}</strong>
          <small>{nextLesson.estimatedMinutes} min / {nextLesson.topic}</small>
        </Link>
        <Link className={styles.actionCard} href={`/problems/${nextProblem.slug}`}>
          <span>Practice</span>
          <strong>{nextProblem.title}</strong>
          <small>{nextProblem.category} / {nextProblem.difficulty}</small>
        </Link>
        <div className={styles.actionCard}>
          <span>Review</span>
          <strong>{reviewSignals[completedLessons.length % reviewSignals.length]}</strong>
          <small>Giúp kiến thức ở lại lâu hơn</small>
        </div>
      </div>

      <div className={styles.badgesRow}>
        <span className={styles.badgesLabel}>Learning states</span>
        <div className={styles.badges}>
          <Badge active={completedLessons.length > 0} name="Started" desc="Đã bắt đầu lesson đầu tiên" />
          <Badge active={completedLessons.length >= 3} name="In Progress" desc="Đang xây nền tảng đều đặn" />
          <Badge active={completedProblems.length > 0} name="Problem Solver" desc="Đã đưa lý thuyết vào practice" />
          <Badge active={overallPct >= 50} name="Builder Ready" desc="Sẵn sàng làm project nhỏ" />
        </div>
      </div>
    </section>
  );
}

function Badge({ active, name, desc }: { active: boolean; name: string; desc: string }) {
  return (
    <div className={`${styles.badge} ${active ? styles.badgeUnlocked : ""}`}>
      <span className={styles.badgeDot} />
      <div>
        <div className={styles.badgeName}>{name}</div>
        <div className={styles.badgeDesc}>{desc}</div>
      </div>
    </div>
  );
}
