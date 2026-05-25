import Link from "next/link";
import { notFound } from "next/navigation";
import { AlgorithmComparison } from "@/components/AlgorithmComparison";
import { AlgorithmPlayground } from "@/components/AlgorithmPlayground";
import { LessonVisualizer } from "@/components/LessonVisualizer";
import { CompletionButton } from "@/components/CompletionButton";
import { QuizSection } from "@/components/QuizSection";
import { getLesson, getNextLesson, lessons } from "@/lib/lessons";
import styles from "./lesson.module.css";

interface LessonPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return lessons.map((lesson) => ({ slug: lesson.slug }));
}

export async function generateMetadata({ params }: LessonPageProps) {
  const { slug } = await params;
  const lesson = getLesson(slug);

  return {
    title: lesson ? `${lesson.title} | JRFN Algorithm` : "Bài học",
    description: lesson?.summary,
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug } = await params;
  const lesson = getLesson(slug);

  if (!lesson) {
    notFound();
  }

  const nextLesson = getNextLesson(lesson);
  const detailedSections = lesson.detailedExplanation ?? [
    {
      title: "1. Bản chất bài toán",
      body: lesson.why,
    },
    {
      title: "2. Ý tưởng thuật toán",
      body: lesson.coreIdea,
    },
    {
      title: "3. Quy trình triển khai",
      body: lesson.steps.map((step) => `${step.title}: ${step.body}`).join(" "),
    },
    {
      title: "4. Cách đọc độ phức tạp",
      body: lesson.complexity.why,
    },
    {
      title: "5. Phạm vi áp dụng",
      body: `${lesson.whenToUse} ${lesson.whenNotToUse}`,
    },
  ];

  return (
    <main className={styles.shell}>
      <section className={styles.workspace}>
        <aside className={styles.sidebar} aria-label="Lộ trình học">
          <Link className={styles.backLink} href="/">
            Về roadmap
          </Link>

          <div>
            <p className={styles.kicker}>Đang học</p>
            <h1>{lesson.title}</h1>
            <p>{lesson.summary}</p>
          </div>

          <nav className={styles.lessonNav} aria-label="Mục trong bài">
            <a href="#why">Tổng quan</a>
            <a href="#detail">Giải thích chi tiết</a>
            <a href="#example">Trace ví dụ</a>
            <a href="#code">Code và Big-O</a>
            <a href="#practice">Luyện tập</a>
          </nav>
        </aside>

        <article className={styles.lessonPanel}>
          <header className={styles.lessonHeader}>
            <div>
              <p className={styles.kicker}>
                {lesson.topic} / {lesson.difficulty}
              </p>
              <h2>{lesson.title}</h2>
              <p>{lesson.summary}</p>
            </div>
            <div className={styles.lessonMeta}>
              <span>{lesson.estimatedMinutes} phút</span>
              <span>{lesson.complexity.time}</span>
              <span>{lesson.complexity.space}</span>
            </div>
          </header>

          <section className={styles.ideaBand} id="why">
            <h3>Ý tưởng cốt lõi</h3>
            <p>{lesson.coreIdea}</p>
          </section>

          <section className={styles.sectionBlock}>
            <h3>Mục tiêu sau bài học</h3>
            <ul className={styles.checkList}>
              {(lesson.learningObjectives ?? [
                `Hiểu ${lesson.title} giải quyết bài toán gì.`,
                "Trace được thuật toán bằng ví dụ nhỏ.",
                "Đọc và tự viết lại được code Python cơ bản.",
                "Giải thích được độ phức tạp Time và Space.",
              ]).map((objective) => (
                <li key={objective}>{objective}</li>
              ))}
            </ul>
          </section>

          <section className={styles.sectionBlock}>
            <h3>Tại sao cần học?</h3>
            <p>{lesson.why}</p>
            <p className={styles.analogy}>{lesson.analogy}</p>
          </section>

          <section className={styles.sectionBlock} id="detail">
            <h3>Giải thích chi tiết</h3>
            <div className={styles.detailList}>
              {detailedSections.map((step) => (
                <article className={styles.detailItem} key={step.title}>
                  <h4>{step.title}</h4>
                  <p>{step.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.sectionBlock} id="example">
            <div className={styles.visualizerBlock}>
              <LessonVisualizer slug={lesson.slug} />
            </div>

            <h3>{lesson.exampleTitle}</h3>
            <p className={styles.inlineExample}>{lesson.exampleInput}</p>

            <div className={styles.arrayRow} aria-label="Ví dụ trực quan">
              {lesson.visualItems.map((value, index) => (
                <span
                  className={
                    lesson.targetItems?.includes(value) ? styles.targetCell : styles.arrayCell
                  }
                  key={`${value}-${index}`}
                >
                  {value}
                </span>
              ))}
            </div>

            <div
              className={styles.traceTable}
              style={{ gridTemplateColumns: `repeat(${lesson.traceHeaders.length}, minmax(0, 1fr))` }}
            >
              {lesson.traceHeaders.map((header) => (
                <div className={styles.traceHead} key={header}>
                  {header}
                </div>
              ))}
              {lesson.traceRows.flatMap((row, rowIndex) =>
                row.cells.map((cell, cellIndex) => (
                  <div key={`${rowIndex}-${cellIndex}`}>{cell}</div>
                )),
              )}
            </div>
          </section>

          <section className={styles.sectionBlock}>
            <h3>Pseudocode</h3>
            <ol className={styles.pseudocode}>
              {lesson.pseudocode.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ol>
          </section>

          <section className={styles.sectionBlock} id="code">
            <h3>Code Python</h3>
            <pre className={styles.codeBlock}>
              <code>{lesson.code}</code>
            </pre>
          </section>

          <section className={styles.sectionBlock}>
            <AlgorithmPlayground slug={lesson.slug} />
          </section>

          <section className={styles.sectionBlock}>
            <h3>Độ phức tạp</h3>
            <div className={styles.complexityGrid}>
              <div>
                <strong>Time complexity</strong>
                <span>{lesson.complexity.time}</span>
              </div>
              <div>
                <strong>Space complexity</strong>
                <span>{lesson.complexity.space}</span>
              </div>
            </div>
            <p>{lesson.complexity.why}</p>
          </section>

          <section className={styles.sectionBlock}>
            <h3>Khi nào dùng?</h3>
            <div className={styles.twoColumn}>
              <p>{lesson.whenToUse}</p>
              <p>{lesson.whenNotToUse}</p>
            </div>
          </section>

          <section className={styles.sectionBlock}>
            <AlgorithmComparison topic={lesson.topic} />
          </section>

          <section className={styles.sectionBlock}>
            <h3>Lỗi thường gặp</h3>
            <ul className={styles.checkList}>
              {(lesson.commonMistakes ?? [
                "Nhảy vào code khi chưa trace thử input nhỏ.",
                "Quên kiểm tra edge cases như mảng rỗng, một phần tử hoặc target không tồn tại.",
                "Nhầm điều kiện dừng hoặc cập nhật sai chỉ số.",
              ]).map((mistake) => (
                <li key={mistake}>{mistake}</li>
              ))}
            </ul>
          </section>

          <section className={styles.practice} id="practice">
            <div>
              <p className={styles.kicker}>Luyện tập</p>
              <h3>{lesson.practice[0]?.question}</h3>
              <p>Gợi ý: {lesson.practice[0]?.hint}</p>
              <details>
                <summary>Xem đáp án</summary>
                <p>{lesson.practice[0]?.answer}</p>
              </details>
            </div>
          </section>

          <QuizSection quiz={lesson.quiz[0]} />

          <section className={styles.sectionBlock}>
            <h3>Bài tập thêm</h3>
            <div className={styles.exerciseList}>
              {(lesson.extraPractice ?? lesson.practice).map((item) => (
                <article key={item.question}>
                  <h4>{item.question}</h4>
                  <p>Gợi ý: {item.hint}</p>
                  <details>
                    <summary>Xem đáp án</summary>
                    <p>{item.answer}</p>
                  </details>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.sectionBlock} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border)", paddingTop: "24px" }}>
            <div>
              <h3 style={{ margin: 0 }}>Hoàn thành bài học này?</h3>
              <p style={{ color: "var(--muted)", margin: "4px 0 0 0", fontSize: "14px" }}>Đánh dấu để lưu lại tiến trình học tập của bạn.</p>
            </div>
            <CompletionButton slug={lesson.slug} type="lesson" />
          </section>

          <footer className={styles.nextBlock}>
            {nextLesson ? (
              <Link href={`/lessons/${nextLesson.slug}`}>Học tiếp: {nextLesson.title}</Link>
            ) : (
              <Link href="/">Quay về roadmap</Link>
            )}
          </footer>
        </article>
      </section>
    </main>
  );
}
