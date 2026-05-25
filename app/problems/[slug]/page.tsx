import Link from "next/link";
import { notFound } from "next/navigation";
import { classicProblems, getClassicProblem } from "@/lib/classic-problems";
import { getLesson } from "@/lib/lessons";
import { CompletionButton } from "@/components/CompletionButton";
import styles from "./problem.module.css";

interface ProblemPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return classicProblems.map((problem) => ({ slug: problem.slug }));
}

export async function generateMetadata({ params }: ProblemPageProps) {
  const { slug } = await params;
  const problem = getClassicProblem(slug);

  return {
    title: problem ? `${problem.title} | JRFN Algorithm` : "Bài toán kinh điển",
    description: problem?.summary,
  };
}

export default async function ProblemPage({ params }: ProblemPageProps) {
  const { slug } = await params;
  const problem = getClassicProblem(slug);

  if (!problem) {
    notFound();
  }

  const relatedLessons = problem.lessonSlugs
    .map((lessonSlug) => getLesson(lessonSlug))
    .filter(Boolean);

  return (
    <main className={styles.shell}>
      <aside className={styles.sidebar}>
        <Link className={styles.backLink} href="/problems">
          Về kho bài toán
        </Link>

        <div>
          <p className={styles.kicker}>{problem.originalName}</p>
          <h1>{problem.title}</h1>
          <p>{problem.summary}</p>
        </div>

        <div className={styles.metaStack}>
          <span>{problem.difficulty}</span>
          <span>{problem.category}</span>
          <span>{problem.complexity.time}</span>
        </div>
      </aside>

      <article className={styles.panel}>
        <section className={styles.hero}>
          <p className={styles.kicker}>Classic problem</p>
          <h2>{problem.title}</h2>
          <p>{problem.story}</p>
        </section>

        <section className={styles.sectionBlock}>
          <h3>Đề bài</h3>
          <div className={styles.ioGrid}>
            <div>
              <strong>Input</strong>
              <p>{problem.input}</p>
            </div>
            <div>
              <strong>Output</strong>
              <p>{problem.output}</p>
            </div>
          </div>
        </section>

        <section className={styles.sectionBlock}>
          <h3>Ví dụ nhỏ</h3>
          <div className={styles.exampleList}>
            {problem.examples.map((example) => (
              <article key={`${example.input}-${example.output}`}>
                <pre>{example.input}</pre>
                <pre>{example.output}</pre>
                <p>{example.explanation}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.sectionBlock}>
          <h3>Ý tưởng giải</h3>
          <ol className={styles.stepList}>
            {problem.approach.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section className={styles.sectionBlock}>
          <h3>Thuật toán liên quan</h3>
          <div className={styles.tagGrid}>
            {problem.relatedAlgorithms.map((algorithm) => (
              <span key={algorithm}>{algorithm}</span>
            ))}
          </div>

          {relatedLessons.length > 0 ? (
            <div className={styles.relatedLessons}>
              {relatedLessons.map((lesson) =>
                lesson ? (
                  <Link href={`/lessons/${lesson.slug}`} key={lesson.slug}>
                    Học nền tảng: {lesson.title}
                  </Link>
                ) : null,
              )}
            </div>
          ) : null}
        </section>

        <section className={styles.sectionBlock}>
          <h3>Độ phức tạp</h3>
          <div className={styles.complexityGrid}>
            <div>
              <strong>Time</strong>
              <span>{problem.complexity.time}</span>
            </div>
            <div>
              <strong>Space</strong>
              <span>{problem.complexity.space}</span>
            </div>
          </div>
        </section>

        <section className={styles.sectionBlock}>
          <h3>Bẫy thường gặp</h3>
          <ul className={styles.warningList}>
            {problem.pitfalls.map((pitfall) => (
              <li key={pitfall}>{pitfall}</li>
            ))}
          </ul>
        </section>

        <section className={styles.sectionBlock} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border)", paddingTop: "24px" }}>
          <div>
            <h3 style={{ margin: 0 }}>Đã giải quyết bài toán này?</h3>
            <p style={{ color: "var(--muted)", margin: "4px 0 0 0", fontSize: "14px" }}>Đánh dấu để hoàn thành bài toán và tăng chuỗi Streak của bạn.</p>
          </div>
          <CompletionButton slug={problem.slug} type="problem" />
        </section>

        <footer className={styles.nextBlock}>
          <Link href="/problems">Xem thêm bài toán kinh điển</Link>
        </footer>
      </article>
    </main>
  );
}
