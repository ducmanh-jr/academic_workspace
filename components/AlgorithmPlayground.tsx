"use client";

import { useMemo, useState } from "react";
import styles from "./AlgorithmPlayground.module.css";

type PlaygroundAlgorithm =
  | "linear-search"
  | "binary-search"
  | "bubble-sort"
  | "selection-sort"
  | "insertion-sort"
  | "quick-sort"
  | "merge-sort"
  | "counting-sort"
  | "radix-sort";

const supported = new Set<PlaygroundAlgorithm>([
  "linear-search",
  "binary-search",
  "bubble-sort",
  "selection-sort",
  "insertion-sort",
  "quick-sort",
  "merge-sort",
  "counting-sort",
  "radix-sort",
]);

export function AlgorithmPlayground({ slug }: { slug: string }) {
  const algorithm = supported.has(slug as PlaygroundAlgorithm)
    ? (slug as PlaygroundAlgorithm)
    : null;
  const [input, setInput] = useState("7, 12, 9, 11, 3");
  const [target, setTarget] = useState("9");

  const result = useMemo(() => {
    if (!algorithm) return null;
    const values = parseArray(input);
    if (!values.length) {
      return { output: "[]", steps: 0, note: "Nhập ít nhất một số để chạy thử." };
    }
    return runAlgorithm(algorithm, values, Number(target));
  }, [algorithm, input, target]);

  if (!algorithm || !result) return null;

  const isSearch = algorithm === "linear-search" || algorithm === "binary-search";

  return (
    <section className={styles.panel}>
      <header>
        <p className={styles.kicker}>Playground</p>
        <h3>Chạy thử với dữ liệu của bạn</h3>
        <p>Nhập mảng số, chạy thuật toán và xem output cùng số bước ước lượng.</p>
      </header>

      <div className={styles.controls}>
        <label>
          Mảng đầu vào
          <input value={input} onChange={(event) => setInput(event.target.value)} />
        </label>
        {isSearch ? (
          <label>
            Target
            <input value={target} onChange={(event) => setTarget(event.target.value)} />
          </label>
        ) : null}
      </div>

      <div className={styles.resultGrid}>
        <div>
          <span>Kết quả</span>
          <strong>{result.output}</strong>
        </div>
        <div>
          <span>Số bước</span>
          <strong>{result.steps}</strong>
        </div>
        <div>
          <span>Ghi chú</span>
          <strong>{result.note}</strong>
        </div>
      </div>
    </section>
  );
}

function parseArray(input: string) {
  return input
    .split(",")
    .map((item) => Number(item.trim()))
    .filter((item) => Number.isFinite(item));
}

function runAlgorithm(algorithm: PlaygroundAlgorithm, values: number[], target: number) {
  if (algorithm === "linear-search") return linearSearch(values, target);
  if (algorithm === "binary-search") return binarySearch(values, target);
  const { output, steps } = sortWithCount(algorithm, values);
  return { output: `[${output.join(", ")}]`, steps, note: "Mảng đã được sắp xếp tăng dần." };
}

function linearSearch(values: number[], target: number) {
  for (let i = 0; i < values.length; i += 1) {
    if (values[i] === target) {
      return { output: `Tìm thấy tại index ${i}`, steps: i + 1, note: "Dừng ngay khi gặp target." };
    }
  }
  return { output: "Không tìm thấy", steps: values.length, note: "Đã kiểm tra toàn bộ mảng." };
}

function binarySearch(values: number[], target: number) {
  const arr = [...values].sort((a, b) => a - b);
  let left = 0;
  let right = arr.length - 1;
  let steps = 0;
  while (left <= right) {
    steps += 1;
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
      return {
        output: `Tìm thấy tại index ${mid} trong mảng đã sort [${arr.join(", ")}]`,
        steps,
        note: "Binary Search yêu cầu dữ liệu đã sắp xếp.",
      };
    }
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return { output: `Không tìm thấy trong [${arr.join(", ")}]`, steps, note: "Phạm vi tìm kiếm đã rỗng." };
}

function sortWithCount(algorithm: PlaygroundAlgorithm, values: number[]) {
  const arr = [...values];
  let steps = 0;

  if (algorithm === "bubble-sort") {
    for (let end = arr.length - 1; end > 0; end -= 1) {
      for (let i = 0; i < end; i += 1) {
        steps += 1;
        if (arr[i] > arr[i + 1]) {
          [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        }
      }
    }
    return { output: arr, steps };
  }

  if (algorithm === "selection-sort") {
    for (let i = 0; i < arr.length - 1; i += 1) {
      let min = i;
      for (let j = i + 1; j < arr.length; j += 1) {
        steps += 1;
        if (arr[j] < arr[min]) min = j;
      }
      [arr[i], arr[min]] = [arr[min], arr[i]];
    }
    return { output: arr, steps };
  }

  if (algorithm === "insertion-sort") {
    for (let i = 1; i < arr.length; i += 1) {
      const key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        steps += 1;
        arr[j + 1] = arr[j];
        j -= 1;
      }
      arr[j + 1] = key;
    }
    return { output: arr, steps };
  }

  if (algorithm === "counting-sort" || algorithm === "radix-sort") {
    return { output: deterministicSorted(arr), steps: arr.length };
  }

  if (algorithm === "quick-sort") {
    quickSort(arr, 0, arr.length - 1, () => {
      steps += 1;
    });
    return { output: arr, steps };
  }

  if (algorithm === "merge-sort") {
    const result = mergeSort(arr, () => {
      steps += 1;
    });
    return { output: result, steps };
  }

  return { output: deterministicSorted(arr), steps: arr.length };
}

function deterministicSorted(values: number[]) {
  return mergeSort(values, () => undefined);
}

function quickSort(arr: number[], low: number, high: number, onCompare: () => void) {
  if (low >= high) return;

  const pivot = arr[high];
  let i = low;
  for (let j = low; j < high; j += 1) {
    onCompare();
    if (arr[j] <= pivot) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i += 1;
    }
  }

  [arr[i], arr[high]] = [arr[high], arr[i]];
  quickSort(arr, low, i - 1, onCompare);
  quickSort(arr, i + 1, high, onCompare);
}

function mergeSort(values: number[], onCompare: () => void): number[] {
  if (values.length <= 1) return [...values];

  const mid = Math.floor(values.length / 2);
  const left = mergeSort(values.slice(0, mid), onCompare);
  const right = mergeSort(values.slice(mid), onCompare);
  const merged: number[] = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    onCompare();
    if (left[i] <= right[j]) {
      merged.push(left[i]);
      i += 1;
    } else {
      merged.push(right[j]);
      j += 1;
    }
  }

  return merged.concat(left.slice(i), right.slice(j));
}
