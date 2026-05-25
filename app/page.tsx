"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  countAllTopics,
  countAvailableLessons,
  countAvailableTopics,
  curriculum,
  isTopicAvailable,
} from "@/lib/curriculum";
import { classicProblems } from "@/lib/classic-problems";
import { lessons } from "@/lib/lessons";
import { Dashboard } from "@/components/Dashboard";
import styles from "./page.module.css";

// Utility: split an array into chunks of given size
function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

const foundations = lessons.filter((lesson) => lesson.difficulty === "foundation");
const beginners = lessons.filter((lesson) => lesson.difficulty === "beginner");

const problemCurriculum = (() => {
  const categories = [
    {
      id: "data-structures",
      title: "Cấu trúc dữ liệu",
      description: "Mảng, Bảng băm, Ngăn xếp, và thiết kế cấu trúc dữ liệu tối ưu.",
      keywords: ["Array", "Hash", "Stack", "Queue", "LRU"]
    },
    {
      id: "search-sort",
      title: "Tìm kiếm & Sắp xếp",
      description: "Tối ưu hóa thời gian với các thuật toán phân chia dữ liệu.",
      keywords: ["Binary Search", "Sorting", "Sort"]
    },
    {
      id: "dp",
      title: "Quy hoạch động",
      description: "Giải quyết bài toán tối ưu bằng cách chia nhỏ và lưu vết trạng thái.",
      keywords: ["Dynamic Programming", "DP"]
    },
    {
      id: "graph",
      title: "Đồ thị & Lưới",
      description: "Tìm đường đi ngắn nhất, cây khung và duyệt ma trận.",
      keywords: ["Graph", "Grid", "MST"]
    },
    {
      id: "recursion",
      title: "Đệ quy & Quay lui",
      description: "Vét cạn mọi khả năng trong không gian trạng thái, cắt tỉa nhánh sai.",
      keywords: ["Recursion", "Backtracking", "Divide and Conquer"]
    },
    {
      id: "concurrency",
      title: "Đồng bộ & Đa luồng",
      description: "Kiểm soát tài nguyên dùng chung, tránh deadlock và race conditions.",
      keywords: ["Concurrency", "Synchronization", "Buffer"]
    }
  ];

  const used = new Set<string>();
  const curriculum = categories.map(cat => {
    const matched = classicProblems.filter(p => {
      if (used.has(p.slug)) return false;
      const isMatch = cat.keywords.some(k => p.category.includes(k));
      if (isMatch) used.add(p.slug);
      return isMatch;
    });
    return { ...cat, problems: matched };
  });

  const remaining = classicProblems.filter(p => !used.has(p.slug));
  if (remaining.length > 0) {
    curriculum.push({
      id: "others",
      title: "Các bài toán khác",
      description: "Các bài toán kinh điển kết hợp nhiều kỹ thuật phức tạp.",
      keywords: [],
      problems: remaining
    });
  }

  // Lọc bỏ những nhóm không có bài toán nào
  return curriculum.filter(cat => cat.problems.length > 0);
})();

export default function Home() {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [completedProblems, setCompletedProblems] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      setCompletedLessons(JSON.parse(localStorage.getItem("completed_lessons") || "[]"));
      setCompletedProblems(JSON.parse(localStorage.getItem("completed_problems") || "[]"));
    }
  }, []);

  return (
    <main className={styles.shell}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <div>
            <p className={styles.kicker}>JRFN Algorithm</p>
            <h1>Học thuật toán một cách có hệ thống</h1>
            <p>
              Một curriculum đầy đủ từ nền tảng đến nâng cao: lý thuyết rõ ràng,
              ví dụ nhỏ, trace từng bước, code mẫu, phân tích độ phức tạp và bài
              tập luyện ngay sau mỗi bài.
            </p>
          </div>
          <Link className={styles.primaryAction} href={`/lessons/${lessons[0].slug}`}>
            Bắt đầu bài đầu tiên
          </Link>
        </div>

        <div className={styles.heroPanel} aria-label="Tổng quan chương trình học">
          <div className={styles.metricGrid}>
            <div>
              <span>{countAvailableLessons()}</span>
              <p>Bài học đã mở</p>
            </div>
            <div>
              <span>{countAllTopics()}</span>
              <p>Chủ đề trong curriculum</p>
            </div>
            <div>
              <span>{classicProblems.length}</span>
              <p>Bài toán kinh điển</p>
            </div>
          </div>
          <div className={styles.sequencePreview}>
            <p>Learning sequence</p>
            <ol>
              <li>Hiểu bài toán</li>
              <li>Trace ví dụ nhỏ</li>
              <li>Đọc code tối giản</li>
              <li>Luyện tập và quiz</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Progress Dashboard */}
      {mounted && (
        <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <Dashboard />
        </section>
      )}

      <section className={styles.principles} aria-label="Nguyên tắc học">
        <article>
          <span>01</span>
          <h2>Nền tảng trước</h2>
          <p>Mỗi thuật toán bắt đầu từ bài toán, input, output và cách làm thủ công.</p>
        </article>
        <article>
          <span>02</span>
          <h2>Trace rõ ràng</h2>
          <p>Ví dụ nhỏ 4-6 phần tử để người học theo dõi từng bước mà không bị ngợp.</p>
        </article>
        <article>
          <span>03</span>
          <h2>Nội dung đầy đủ</h2>
          <p>Mỗi bài có lý thuyết, pseudocode, code, Big-O, lỗi thường gặp và bài tập.</p>
        </article>
      </section>

      <section className={styles.roadmap}>
        <div className={styles.sectionHeader}>
          <div>
            <p className={styles.kicker}>Roadmap</p>
            <h2>Bài học có thể học ngay</h2>
          </div>
          <p>
            Đây là các bài đã có nội dung hoàn chỉnh. Mỗi bài dùng cùng một cấu trúc
            để người học không phải đoán cách học.
          </p>
        </div>

        <div className={styles.lessonGroup}>
          <h3>Phần 1: Tư duy căn bản</h3>
          <div className={styles.lessonList}>
            {foundations.map((lesson, index) => (
              <LessonCard
                index={index + 1}
                key={lesson.slug}
                slug={lesson.slug}
                completed={completedLessons.includes(lesson.slug)}
              />
            ))}
          </div>
        </div>

        <div className={styles.lessonGroup}>
          <h3>Phần 2: Tìm kiếm và sắp xếp</h3>
          <div className={styles.lessonList}>
            {beginners.map((lesson, index) => (
              <LessonCard
                index={foundations.length + index + 1}
                key={lesson.slug}
                slug={lesson.slug}
                completed={completedLessons.includes(lesson.slug)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.curriculumMap}>
        <div className={styles.sectionHeader}>
          <div>
            <p className={styles.kicker}>Curriculum đầy đủ</p>
            <h2>Bản đồ học tất cả thuật toán</h2>
          </div>
          <p>
            Khung mở rộng lấy cảm hứng từ hai nguồn bạn gửi: giải thích đời thường
            cho người mới và roadmap cấu trúc dữ liệu/thuật toán đầy đủ. Các mục
            “Học ngay” đã có bài chi tiết; các mục “Sắp mở” sẽ được lấp dần.
          </p>
        </div>

        <div className={styles.trackGrid}>
          {curriculum.map((track) => (
            <article className={styles.trackCard} key={track.id}>
              <header>
                <div>
                  <h3>{track.title}</h3>
                  <p>{track.description}</p>
                </div>
                <span>
                  {countAvailableTopics(track)}/{track.topics.length}
                </span>
              </header>

              <div className={styles.topicList}>
                {track.topics.map((topic) => {
                  const available = isTopicAvailable(topic);
                  const isCompleted = topic.slug ? completedLessons.includes(topic.slug) : false;

                  return topic.slug && available ? (
                    <Link
                      className={`${styles.topicReady} ${isCompleted ? styles.topicCompleted : ""}`}
                      href={`/lessons/${topic.slug}`}
                      key={topic.title}
                      style={
                        isCompleted
                          ? { border: "1px solid rgba(20, 184, 166, 0.6)", background: "rgba(20, 184, 166, 0.04)" }
                          : undefined
                      }
                    >
                      <strong>
                        {topic.title} {isCompleted && <span style={{ color: "#14b8a6", fontWeight: "800" }}>✓</span>}
                      </strong>
                      <small>{isCompleted ? "Đã hoàn thành bài học" : "Học ngay · Có visualizer"}</small>
                    </Link>
                  ) : (
                    <div className={styles.topicPlanned} key={topic.title}>
                      <strong>{topic.title}</strong>
                      <small>Sắp mở · Chưa có bài</small>
                    </div>
                  );
                })}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.curriculumMap}>
        <div className={styles.sectionHeader}>
          <div>
            <p className={styles.kicker}>Classic Problems Map</p>
            <h2>Bản đồ Bài toán kinh điển thế giới</h2>
          </div>
          <p>
            Các bài toán lập trình kinh điển được chia nhóm khoa học và liên kết
            chặt chẽ với từng kỹ thuật/chủ đề thuật toán cốt lõi. Hãy học lý thuyết
            trước, sau đó giải các bài toán này để làm chủ hoàn toàn kiến thức.
          </p>
        </div>

        <div className={styles.trackGrid}>
          {problemCurriculum.map((track) => (
            <article className={styles.trackCard} key={track.id}>
              <header>
                <div>
                  <h3>{track.title}</h3>
                  <p>{track.description}</p>
                </div>
                <span>{track.problems.length} đề</span>
              </header>

              <div className={styles.topicList}>
                {track.problems.map((prob) => {
                  const isCompleted = completedProblems.includes(prob.slug);

                  return (
                    <Link
                      className={styles.topicReady}
                      href={`/problems/${prob.slug}`}
                      key={prob.slug}
                      style={
                        isCompleted
                          ? { border: "1px solid rgba(20, 184, 166, 0.6)", background: "rgba(20, 184, 166, 0.04)" }
                          : undefined
                      }
                    >
                      <strong>
                        {prob.title} {isCompleted && <span style={{ color: "#14b8a6", fontWeight: "800" }}>✓</span>}
                      </strong>
                      <small>
                        {isCompleted ? "Đã giải quyết bài toán" : "Giải ngay"} · Độ khó: {prob.difficulty === "easy" ? "Dễ" : prob.difficulty === "medium" ? "Trung bình" : "Khó"}
                      </small>
                    </Link>
                  );
                })}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function LessonCard({
  slug,
  index,
  completed,
}: {
  slug: string;
  index: number;
  completed: boolean;
}) {
  const lesson = lessons.find((item) => item.slug === slug);

  if (!lesson) {
    return null;
  }

  return (
    <Link
      className={styles.lessonCard}
      href={`/lessons/${lesson.slug}`}
      style={
        completed
          ? { border: "1px solid rgba(20, 184, 166, 0.4)", background: "rgba(20, 184, 166, 0.03)" }
          : undefined
      }
    >
      <span style={completed ? { color: "#14b8a6" } : undefined}>
        {completed ? "✓" : String(index).padStart(2, "0")}
      </span>
      <div>
        <h4>{lesson.title}</h4>
        <p>{lesson.summary}</p>
        <small>
          {lesson.topic} / {lesson.estimatedMinutes} phút / {lesson.complexity.time}
          {completed && (
            <span style={{ color: "#14b8a6", fontWeight: "800", marginLeft: "8px" }}>
              • Đã học
            </span>
          )}
        </small>
      </div>
    </Link>
  );
}
