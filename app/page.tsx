"use client";

import { useEffect, useMemo, useState } from "react";
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

const learningTracks = [
  {
    id: "algorithms",
    title: "Algorithms",
    domain: "Computer Science",
    description: "Tư duy thuật toán, cấu trúc dữ liệu, phân tích độ phức tạp và classic problems.",
    progress: 46,
    accent: "teal",
    status: "Core track",
    next: lessons[0]?.slug,
  },
  {
    id: "programming",
    title: "Programming",
    domain: "Software Craft",
    description: "Python, TypeScript, debugging, clean code và cách biến ý tưởng thành sản phẩm nhỏ.",
    progress: 28,
    accent: "blue",
    status: "Opening",
    next: lessons.find((lesson) => lesson.slug === "thuat-toan-la-gi")?.slug,
  },
  {
    id: "math",
    title: "Mathematics",
    domain: "Foundations",
    description: "Đại số, xác suất, logic, linear algebra và cách đọc công thức bằng trực giác.",
    progress: 18,
    accent: "amber",
    status: "New",
  },
  {
    id: "ai",
    title: "AI / Machine Learning",
    domain: "Applied AI",
    description: "Dữ liệu, mô hình, đánh giá kết quả và các mini project ứng dụng AI.",
    progress: 12,
    accent: "violet",
    status: "New",
  },
  {
    id: "english",
    title: "English",
    domain: "Communication",
    description: "Đọc tài liệu kỹ thuật, từ vựng học thuật, viết note và trình bày lời giải.",
    progress: 24,
    accent: "rose",
    status: "Support",
  },
  {
    id: "research",
    title: "Research Skills",
    domain: "Academic Work",
    description: "Đọc paper, lập literature map, viết citation, thiết kế thực nghiệm và báo cáo.",
    progress: 10,
    accent: "slate",
    status: "New",
  },
];

const todayPlan = [
  {
    mode: "Learn",
    title: "Ôn lại Big-O đơn giản",
    detail: "15 phút đọc lý thuyết và trace 3 ví dụ nhỏ.",
    href: "/lessons/big-o-don-gian",
  },
  {
    mode: "Practice",
    title: "Làm 2 bài tìm kiếm",
    detail: "Tập trung vào cách chọn left, right, mid và điều kiện dừng.",
    href: "/lessons/binary-search",
  },
  {
    mode: "Build",
    title: "Mini search notebook",
    detail: "Biến binary search thành một công cụ tìm mục tiêu trong dataset nhỏ.",
  },
];

const buildProjects = [
  {
    title: "Mini Search Engine",
    field: "Algorithms + Programming",
    description: "Ứng dụng linear search, binary search và ranking cơ bản vào bộ dữ liệu tài liệu.",
    steps: ["Index dữ liệu", "Tìm theo keyword", "Sắp xếp kết quả"],
  },
  {
    title: "Study Analytics",
    field: "Math + Data",
    description: "Theo dõi thời gian học, độ khó, số lần ôn tập và dự đoán bài cần review.",
    steps: ["Gom log học", "Tính mastery", "Vẽ dashboard"],
  },
  {
    title: "Paper Reading Kit",
    field: "English + Research",
    description: "Mẫu đọc paper gồm abstract, method, result, limitation và câu hỏi phản biện.",
    steps: ["Tóm tắt", "Trích ý chính", "Viết câu hỏi"],
  },
];

const libraryItems = [
  "Formula notes",
  "Code snippets",
  "Vocabulary cards",
  "Paper summaries",
  "Project logs",
];

const foundations = lessons.filter((lesson) => lesson.difficulty === "foundation");
const beginners = lessons.filter((lesson) => lesson.difficulty === "beginner");

const problemCurriculum = (() => {
  const categories = [
    {
      id: "data-structures",
      title: "Cấu trúc dữ liệu",
      description: "Array, hash table, stack, queue và các cấu trúc dữ liệu tối ưu.",
      keywords: ["Array", "Hash", "Stack", "Queue", "LRU"],
    },
    {
      id: "search-sort",
      title: "Tìm kiếm & Sắp xếp",
      description: "Tối ưu thời gian bằng cách chia, so sánh và sắp xếp dữ liệu.",
      keywords: ["Binary Search", "Sorting", "Sort"],
    },
    {
      id: "dp",
      title: "Quy hoạch động",
      description: "Chia bài toán thành trạng thái nhỏ và lưu lại kết quả đã tính.",
      keywords: ["Dynamic Programming", "DP"],
    },
    {
      id: "graph",
      title: "Đồ thị & Lưới",
      description: "Duyệt đồ thị, tìm đường đi, cây khung và xử lý ma trận.",
      keywords: ["Graph", "Grid", "MST"],
    },
    {
      id: "recursion",
      title: "Đệ quy & Quay lui",
      description: "Thử lựa chọn trong không gian trạng thái và cắt nhánh sai.",
      keywords: ["Recursion", "Backtracking", "Divide and Conquer"],
    },
    {
      id: "concurrency",
      title: "Đồng bộ & Đa luồng",
      description: "Kiểm soát tài nguyên dùng chung, tránh deadlock và race condition.",
      keywords: ["Concurrency", "Synchronization", "Buffer"],
    },
  ];

  const used = new Set<string>();
  const grouped = categories.map((category) => {
    const problems = classicProblems.filter((problem) => {
      if (used.has(problem.slug)) return false;
      const isMatch = category.keywords.some((keyword) => problem.category.includes(keyword));
      if (isMatch) used.add(problem.slug);
      return isMatch;
    });

    return { ...category, problems };
  });

  const remaining = classicProblems.filter((problem) => !used.has(problem.slug));
  if (remaining.length > 0) {
    grouped.push({
      id: "others",
      title: "Bài toán tổng hợp",
      description: "Những bài kinh điển kết hợp nhiều kỹ thuật và cách suy luận.",
      keywords: [],
      problems: remaining,
    });
  }

  return grouped.filter((category) => category.problems.length > 0);
})();

export default function Home() {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [completedProblems, setCompletedProblems] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCompletedLessons(JSON.parse(localStorage.getItem("completed_lessons") || "[]"));
    setCompletedProblems(JSON.parse(localStorage.getItem("completed_problems") || "[]"));
  }, []);

  const activeLesson = useMemo(() => {
    return lessons.find((lesson) => !completedLessons.includes(lesson.slug)) ?? lessons[0];
  }, [completedLessons]);

  return (
    <main className={styles.shell}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>JRFN Learning OS</p>
          <h1>Một workspace học tập đa lĩnh vực, bắt đầu từ thuật toán.</h1>
          <p>
            Trang chủ mới giúp người học biết mình đang học gì, tiến bộ ra sao và nên làm gì tiếp
            theo. Algorithms vẫn là track cốt lõi, nhưng được mở rộng thành Learn, Practice, Build,
            Library và Progress cho nhiều lĩnh vực.
          </p>
          <div className={styles.heroActions}>
            <Link className={styles.primaryAction} href={`/lessons/${activeLesson.slug}`}>
              Tiếp tục học
            </Link>
            <a className={styles.secondaryAction} href="#tracks">
              Xem lo trinh
            </a>
          </div>
        </div>

        <div className={styles.heroPanel} aria-label="Tổng quan hệ sinh thái học tập">
          <div className={styles.metricGrid}>
            <div>
              <span>{learningTracks.length}</span>
              <p>Learning tracks</p>
            </div>
            <div>
              <span>{countAvailableLessons()}</span>
              <p>Bài học sẵn sàng</p>
            </div>
            <div>
              <span>{classicProblems.length}</span>
              <p>Classic problems</p>
            </div>
          </div>
          <div className={styles.sequencePreview}>
            <p>Learning model</p>
            <ol>
              <li>Learn để nắm khái niệm</li>
              <li>Practice để kiểm tra hiểu biết</li>
              <li>Build để biến kiến thức thành sản phẩm</li>
              <li>Review để giữ mastery dài hạn</li>
            </ol>
          </div>
        </div>
      </section>

      {mounted && <Dashboard />}

      <section className={styles.todayGrid} aria-label="Kế hoạch học hôm nay">
        <div className={styles.sectionHeader}>
          <div>
            <p className={styles.kicker}>Today</p>
            <h2>Mở app lên là biết học gì tiếp theo</h2>
          </div>
          <p>
            Dashboard mới ưu tiên quyết định nhanh: tiếp tục bài đang dở, ôn tập đúng lúc và có một
            project nhỏ để áp dụng.
          </p>
        </div>

        <div className={styles.planGrid}>
          {todayPlan.map((item) =>
            item.href ? (
              <Link className={styles.planCard} href={item.href} key={item.title}>
                <span>{item.mode}</span>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </Link>
            ) : (
              <article className={styles.planCard} key={item.title}>
                <span>{item.mode}</span>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </article>
            ),
          )}
        </div>
      </section>

      <section className={styles.trackSection} id="tracks">
        <div className={styles.sectionHeader}>
          <div>
            <p className={styles.kicker}>Learning Tracks</p>
            <h2>Từ problem list thành bản đồ năng lực</h2>
          </div>
          <p>
            Mỗi track có mục tiêu riêng, tiến độ riêng và có thể mở rộng thành module, lesson, quiz,
            bài tập hoặc project mà không làm rối navigation.
          </p>
        </div>

        <div className={styles.learningTrackGrid}>
          {learningTracks.map((track) => (
            <article className={`${styles.learningTrack} ${styles[track.accent]}`} key={track.id}>
              <header>
                <span>{track.status}</span>
                <small>{track.domain}</small>
              </header>
              <h3>{track.title}</h3>
              <p>{track.description}</p>
              <div className={styles.progressBar} aria-label={`${track.title} progress`}>
                <i style={{ width: `${track.progress}%` }} />
              </div>
              <footer>
                <strong>{track.progress}% mastery</strong>
                {track.next ? <Link href={`/lessons/${track.next}`}>Open</Link> : <span>Planned</span>}
              </footer>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.learningSystem}>
        <div className={styles.systemColumn}>
          <div className={styles.sectionHeaderCompact}>
            <p className={styles.kicker}>Learn / Practice / Build</p>
            <h2>Một cấu trúc dùng được cho mọi môn</h2>
          </div>
          <div className={styles.modeList}>
            <article>
              <span>Learn</span>
              <h3>Học khái niệm bằng ví dụ nhỏ</h3>
              <p>Lý thuyết, analogy, trace, pseudocode và lỗi sai thường gặp.</p>
            </article>
            <article>
              <span>Practice</span>
              <h3>Luyện để thấy mình hiểu đến đâu</h3>
              <p>Quiz, bài tập code, problem set và trạng thái cần ôn lại.</p>
            </article>
            <article>
              <span>Build</span>
              <h3>Làm project nhỏ để kiến thức có đời sống</h3>
              <p>Mỗi chủ đề có đầu ra cụ thể: tool, notebook, report hoặc demo.</p>
            </article>
          </div>
        </div>

        <aside className={styles.libraryPanel} aria-label="Library">
          <p className={styles.kicker}>Library</p>
          <h2>Kho tri thuc ca nhan</h2>
          <p>Lưu note, công thức, snippet, từ vựng và tóm tắt paper để việc học không bị rời rạc.</p>
          <div>
            {libraryItems.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </aside>
      </section>

      <section className={styles.projectSection}>
        <div className={styles.sectionHeader}>
          <div>
            <p className={styles.kicker}>Projects</p>
            <h2>Build biến việc học thành sản phẩm nhỏ</h2>
          </div>
          <p>
            Khi mở rộng khỏi thuật toán, project là điểm nối giữa lập trình, toán, AI, tiếng Anh và
            kỹ năng nghiên cứu.
          </p>
        </div>

        <div className={styles.projectGrid}>
          {buildProjects.map((project) => (
            <article className={styles.projectCard} key={project.title}>
              <small>{project.field}</small>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <ol>
                {project.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.roadmap}>
        <div className={styles.sectionHeader}>
          <div>
            <p className={styles.kicker}>Algorithm Core</p>
            <h2>Track thuật toán hiện có vẫn được giữ làm nền tảng</h2>
          </div>
          <p>
            Nội dung cũ không bị mất đi; nó được đặt đúng vai trò: một track cốt lõi trong hệ sinh
            thái học tập rộng hơn.
          </p>
        </div>

        <div className={styles.lessonGroup}>
          <h3>Phần 1: Tư duy căn bản</h3>
          <div className={styles.lessonList}>
            {foundations.map((lesson, index) => (
              <LessonCard
                completed={completedLessons.includes(lesson.slug)}
                index={index + 1}
                key={lesson.slug}
                slug={lesson.slug}
              />
            ))}
          </div>
        </div>

        <div className={styles.lessonGroup}>
          <h3>Phần 2: Tìm kiếm và sắp xếp</h3>
          <div className={styles.lessonList}>
            {beginners.map((lesson, index) => (
              <LessonCard
                completed={completedLessons.includes(lesson.slug)}
                index={foundations.length + index + 1}
                key={lesson.slug}
                slug={lesson.slug}
              />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.curriculumMap}>
        <div className={styles.sectionHeader}>
          <div>
            <p className={styles.kicker}>Curriculum Map</p>
            <h2>Bản đồ module cho algorithm track</h2>
          </div>
          <p>
            Cấu trúc Subject - Track - Module - Lesson giúp sau này thêm Math, AI, English hay
            Research Skills mà không cần viết lại trải nghiệm học.
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
                    >
                      <strong>{topic.title}</strong>
                      <small>{isCompleted ? "Completed" : "Learn now"}</small>
                    </Link>
                  ) : (
                    <div className={styles.topicPlanned} key={topic.title}>
                      <strong>{topic.title}</strong>
                      <small>Planned</small>
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
            <p className={styles.kicker}>Practice Map</p>
            <h2>Classic problems nằm trong Practice</h2>
          </div>
          <p>
            Bài toán lập trình được đặt vào đúng context: dùng để luyện sau khi đã có lý thuyết,
            trace và cách nhận diện pattern.
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
                <span>{track.problems.length} bài</span>
              </header>

              <div className={styles.topicList}>
                {track.problems.map((problem) => {
                  const isCompleted = completedProblems.includes(problem.slug);

                  return (
                    <Link
                      className={`${styles.topicReady} ${isCompleted ? styles.topicCompleted : ""}`}
                      href={`/problems/${problem.slug}`}
                      key={problem.slug}
                    >
                      <strong>{problem.title}</strong>
                      <small>{isCompleted ? "Solved" : problem.difficulty}</small>
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
    <Link className={`${styles.lessonCard} ${completed ? styles.lessonCardDone : ""}`} href={`/lessons/${lesson.slug}`}>
      <span>{completed ? "OK" : String(index).padStart(2, "0")}</span>
      <div>
        <h4>{lesson.title}</h4>
        <p>{lesson.summary}</p>
        <small>
          {lesson.topic} / {lesson.estimatedMinutes} min / {lesson.complexity.time}
        </small>
      </div>
    </Link>
  );
}
