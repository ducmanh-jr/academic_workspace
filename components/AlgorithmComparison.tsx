import styles from "./AlgorithmComparison.module.css";

const sortingRows = [
  {
    name: "Bubble Sort",
    best: "O(n)",
    average: "O(n²)",
    worst: "O(n²)",
    space: "O(1)",
    stable: "Có",
    inPlace: "Có",
    useCase: "Học swap và vòng lặp, dữ liệu rất nhỏ.",
  },
  {
    name: "Selection Sort",
    best: "O(n²)",
    average: "O(n²)",
    worst: "O(n²)",
    space: "O(1)",
    stable: "Không",
    inPlace: "Có",
    useCase: "Khi muốn ít lần swap hơn Bubble Sort.",
  },
  {
    name: "Insertion Sort",
    best: "O(n)",
    average: "O(n²)",
    worst: "O(n²)",
    space: "O(1)",
    stable: "Có",
    inPlace: "Có",
    useCase: "Dữ liệu nhỏ hoặc gần sắp xếp.",
  },
  {
    name: "Merge Sort",
    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n log n)",
    space: "O(n)",
    stable: "Có",
    inPlace: "Không",
    useCase: "Cần hiệu năng ổn định và stable sort.",
  },
  {
    name: "Quick Sort",
    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n²)",
    space: "O(log n)",
    stable: "Không",
    inPlace: "Thường có",
    useCase: "Sắp xếp nhanh trong thực tế khi chọn pivot tốt.",
  },
  {
    name: "Counting Sort",
    best: "O(n + k)",
    average: "O(n + k)",
    worst: "O(n + k)",
    space: "O(k)",
    stable: "Có thể",
    inPlace: "Không",
    useCase: "Số nguyên trong khoảng nhỏ.",
  },
  {
    name: "Radix Sort",
    best: "O(d × (n + k))",
    average: "O(d × (n + k))",
    worst: "O(d × (n + k))",
    space: "O(n + k)",
    stable: "Có",
    inPlace: "Không",
    useCase: "Số nguyên nhiều chữ số, cần tránh so sánh trực tiếp.",
  },
];

export function AlgorithmComparison({ topic }: { topic: string }) {
  if (topic !== "Sorting") return null;

  return (
    <section className={styles.panel}>
      <header>
        <p className={styles.kicker}>So sánh thuật toán</p>
        <h3>Khi nào dùng thuật toán sắp xếp nào?</h3>
        <p>
          Bảng này giúp bạn không chỉ biết code, mà còn biết chọn thuật toán phù hợp
          theo độ phức tạp, bộ nhớ và tính stable.
        </p>
      </header>

      <div className={styles.tableWrap}>
        <table>
          <thead>
            <tr>
              <th>Thuật toán</th>
              <th>Best</th>
              <th>Average</th>
              <th>Worst</th>
              <th>Space</th>
              <th>Stable</th>
              <th>In-place</th>
              <th>Khi dùng</th>
            </tr>
          </thead>
          <tbody>
            {sortingRows.map((row) => (
              <tr key={row.name}>
                <td>{row.name}</td>
                <td>{row.best}</td>
                <td>{row.average}</td>
                <td>{row.worst}</td>
                <td>{row.space}</td>
                <td>{row.stable}</td>
                <td>{row.inPlace}</td>
                <td>{row.useCase}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
