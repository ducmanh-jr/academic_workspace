import Link from "next/link";
import { classicProblems, getProblemsByDifficulty } from "@/lib/classic-problems";
import styles from "./problems.module.css";

const groups = [
  {
    title: "Bắt đầu dễ hiểu",
    description: "Các bài nhập môn để luyện cách đọc đề, trace ví dụ và chọn cấu trúc dữ liệu.",
    items: getProblemsByDifficulty("easy"),
  },
  {
    title: "Bài trung cấp kinh điển",
    description: "Những bài xuất hiện rất nhiều trong phỏng vấn, LeetCode, ICPC và competitive programming.",
    items: getProblemsByDifficulty("medium"),
  },
  {
    title: "Thử thách nâng cao",
    description: "Các bài cần backtracking, pruning hoặc tư duy tối ưu sâu hơn.",
    items: getProblemsByDifficulty("hard"),
  },
];

export const metadata = {
  title: "Bài toán kinh điển | JRFN Algorithm",
  description: "Kho bài toán lập trình kinh điển gắn với thuật toán và cấu trúc dữ liệu.",
};

export default function ProblemsPage() {
  const categories = Array.from(new Set(classicProblems.map((problem) => problem.category)));

  return (
    <main className={styles.shell}>
      <section className={styles.hero}>
        <div>
          <p className={styles.kicker}>Classic Problems</p>
          <h1>Bài toán kinh điển trong lập trình</h1>
          <p>
            Đây là nơi nối lý thuyết thuật toán với bài thật: mỗi bài có câu chuyện,
            ví dụ nhỏ, hướng giải, bẫy thường gặp, độ phức tạp và thuật toán liên quan.
          </p>
        </div>
        <div className={styles.heroStats}>
          <div>
            <strong>{classicProblems.length}</strong>
            <span>bài đã có</span>
          </div>
          <div>
            <strong>{categories.length}</strong>
            <span>nhóm chủ đề</span>
          </div>
        </div>
      </section>

      <section className={styles.categoryStrip} aria-label="Nhóm chủ đề">
        {categories.map((category) => (
          <span key={category}>{category}</span>
        ))}
      </section>

      {groups.map((group) => (
        <section className={styles.problemGroup} key={group.title}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.kicker}>Problem set</p>
              <h2>{group.title}</h2>
            </div>
            <p>{group.description}</p>
          </div>

          <div className={styles.problemGrid}>
            {group.items.map((problem) => (
              <Link className={styles.problemCard} href={`/problems/${problem.slug}`} key={problem.slug}>
                <div className={styles.cardTop}>
                  <span>{problem.difficulty}</span>
                  <small>{problem.category}</small>
                </div>
                <h3>{problem.title}</h3>
                <p>{problem.summary}</p>
                <div className={styles.tags}>
                  {problem.relatedAlgorithms.slice(0, 3).map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
