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
        <Link className={styles.backLink} href="/">
          Quay lại Trang chủ
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
          <h3>So sánh hướng giải</h3>
          <div className={styles.strategyGrid}>
            <SolutionStrategyCard strategy={problem.bruteForce} />
            <SolutionStrategyCard strategy={problem.optimized} />
          </div>
        </section>

        <section className={styles.sectionBlock}>
          <h3>Walkthrough theo ví dụ</h3>
          <ol className={styles.stepList}>
            {problem.walkthrough.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section className={styles.sectionBlock}>
          <h3>Pseudocode</h3>
          <pre className={styles.codeBlock}>{problem.pseudocode.join("\n")}</pre>
        </section>

        <section className={styles.sectionBlock}>
          <h3>Code mẫu TypeScript</h3>
          <pre className={styles.codeBlock}>{problem.code}</pre>
        </section>

        <section className={styles.sectionBlock}>
          <h3>Vì sao đúng?</h3>
          <ol className={styles.stepList}>
            {problem.proof.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section className={styles.sectionBlock}>
          <h3>Case biên & biến thể</h3>
          <div className={styles.noteGrid}>
            <div>
              <strong>Case biên cần test</strong>
              <ul className={styles.warningList}>
                {problem.edgeCases.map((edgeCase) => (
                  <li key={edgeCase}>{edgeCase}</li>
                ))}
              </ul>
            </div>
            <div>
              <strong>Biến thể nên luyện tiếp</strong>
              <ul className={styles.warningList}>
                {problem.variations.map((variation) => (
                  <li key={variation}>{variation}</li>
                ))}
              </ul>
            </div>
          </div>
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
          <Link href="/">Quay lại Trang chủ</Link>
        </footer>
      </article>
    </main>
  );
}

function SolutionStrategyCard({
  strategy,
}: {
  strategy: {
    title: string;
    idea: string;
    steps: string[];
    complexity: {
      time: string;
      space: string;
    };
  };
}) {
  return (
    <article>
      <h4>{strategy.title}</h4>
      <p>{strategy.idea}</p>
      <ol className={styles.stepList}>
        {strategy.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <div className={styles.miniComplexity}>
        <span>{strategy.complexity.time}</span>
        <span>{strategy.complexity.space}</span>
      </div>
    </article>
  );
}
