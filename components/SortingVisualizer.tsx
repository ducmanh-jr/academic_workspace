"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./SortingVisualizer.module.css";

type SortingKind = "selection" | "insertion" | "quick" | "merge" | "counting" | "radix";

interface SortFrame {
  array: number[];
  active: number[];
  fixed: number[];
  note: string;
  label: string;
}

const defaultArrays: Record<SortingKind, number[]> = {
  selection: [7, 12, 9, 11, 3],
  insertion: [7, 12, 9, 11, 3],
  quick: [7, 12, 9, 11, 3],
  merge: [7, 12, 9, 11, 3],
  counting: [4, 2, 2, 8, 3, 3, 1],
  radix: [170, 45, 75, 90, 802, 24, 2, 66],
};

const labels: Record<SortingKind, string> = {
  selection: "Selection Sort",
  insertion: "Insertion Sort",
  quick: "Quick Sort",
  merge: "Merge Sort",
  counting: "Counting Sort",
  radix: "Radix Sort",
};

export function SortingVisualizer({ kind }: { kind: SortingKind }) {
  const initialArray = defaultArrays[kind];
  const [values, setValues] = useState<number[]>(initialArray);
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(800);
  const [inputVal, setInputVal] = useState(initialArray.join(", "));
  const [errorMsg, setErrorMsg] = useState("");
  const timerRef = useRef<number | null>(null);

  // Re-initialize values when algorithm kind changes
  useEffect(() => {
    const arr = defaultArrays[kind];
    setValues(arr);
    setInputVal(arr.join(", "));
    setIndex(0);
    setIsPlaying(false);
    setErrorMsg("");
  }, [kind]);

  const frames = useMemo(() => buildFrames(kind, values), [kind, values]);
  const frame = frames[index] ?? frames[0] ?? { array: [], active: [], fixed: [], note: "", label: "" };
  const maxValue = frame.array.length > 0 ? Math.max(...frame.array, 1) : 1;

  useEffect(() => {
    if (!isPlaying) return;

    if (index >= frames.length - 1) {
      setIsPlaying(false);
      return;
    }

    timerRef.current = window.setTimeout(() => {
      setIndex((i) => Math.min(i + 1, frames.length - 1));
    }, speed);

    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, [isPlaying, speed, index, frames.length]);

  function reset(newValues = values) {
    setIsPlaying(false);
    setValues(newValues);
    setIndex(0);
    setErrorMsg("");
  }

  function handleApplyCustom() {
    setErrorMsg("");
    const parts = inputVal.split(",").map((p) => p.trim());
    const parsed: number[] = [];
    for (const part of parts) {
      if (part === "") continue;
      const num = Number(part);
      if (isNaN(num)) {
        setErrorMsg("Chỉ nhập số nguyên cách nhau bởi dấu phẩy.");
        return;
      }
      const maxLimit = kind === "radix" ? 999 : 99;
      if (num < 0 || num > maxLimit) {
        setErrorMsg(`Các phần tử phải nằm trong khoảng từ 0 đến ${maxLimit}.`);
        return;
      }
      parsed.push(num);
    }

    if (parsed.length < 3 || parsed.length > 10) {
      setErrorMsg("Độ dài mảng phải từ 3 đến 10 phần tử.");
      return;
    }

    reset(parsed);
  }

  function handleRandom() {
    setErrorMsg("");
    let arr: number[] = [];
    const len = 5 + Math.floor(Math.random() * 4);
    if (kind === "radix") {
      arr = Array.from({ length: len }, () => Math.floor(Math.random() * 900) + 10);
    } else if (kind === "counting") {
      arr = Array.from({ length: len + 1 }, () => Math.floor(Math.random() * 9) + 1);
    } else {
      arr = Array.from({ length: len }, () => Math.floor(Math.random() * 80) + 12);
    }
    setInputVal(arr.join(", "));
    reset(arr);
  }

  return (
    <section
      className={styles.panel}
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (target.closest("button, input, label, select, textarea")) return;
        setIsPlaying((prev) => !prev);
      }}
      style={{ cursor: "pointer" }}
    >
      <header className={styles.header}>
        <div>
          <p className={styles.kicker}>Mô phỏng tương tác</p>
          <h3>{labels[kind]}</h3>
          <p>{frame.note}</p>
        </div>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "flex-end" }}>
          <span
            style={{
              border: "1px solid var(--border)",
              borderRadius: "6px",
              background: "var(--panel-subtle)",
              color: "var(--accent-dark)",
              padding: "6px 10px",
              fontSize: "13px",
              fontWeight: 800,
            }}
          >
            Bước {index + 1}/{frames.length}
          </span>
        </div>
      </header>

      {/* Input row */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "14px" }}>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <input
            style={{
              flex: 1,
              border: "1px solid var(--border)",
              borderRadius: "6px",
              background: "var(--panel-subtle)",
              color: "var(--foreground)",
              padding: "8px 12px",
              fontSize: "14px",
              fontWeight: 700,
            }}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Nhập mảng ví dụ: 5, 2, 9, 1"
            type="text"
            value={inputVal}
          />
          <button
            style={{
              border: "1px solid var(--border)",
              borderRadius: "6px",
              background: "var(--accent)",
              color: "white",
              padding: "8px 14px",
              fontSize: "14px",
              fontWeight: 800,
              cursor: "pointer",
            }}
            onClick={handleApplyCustom}
            type="button"
          >
            Áp dụng
          </button>
        </div>
        {errorMsg && (
          <span style={{ color: "#ef4444", fontSize: "12px", fontWeight: "bold" }}>
            ⚠️ {errorMsg}
          </span>
        )}
      </div>

      <div className={styles.stage}>
        {frame.array.map((value, itemIndex) => {
          const isComparing = frame.active.includes(itemIndex);
          const isFixed = frame.fixed.includes(itemIndex);
          const className = [
            styles.bar,
            isComparing ? styles.active : "",
            isFixed ? styles.fixed : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <div className={styles.slot} key={itemIndex}>
              <div
                className={className}
                style={{ height: `${Math.max(16, (value / maxValue) * 100)}%` }}
              >
                <span>{value}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.footer}>
        <div>
          <strong style={{ fontSize: "15px", color: "var(--foreground)" }}>{frame.label}</strong>
        </div>
        <div style={{ display: "flex", gap: "8px", alignItems: "center", width: "100%", marginTop: "12px", flexWrap: "wrap" }}>
          <button
            style={{
              border: "1px solid var(--border)",
              borderRadius: "6px",
              background: "var(--accent)",
              color: "white",
              padding: "8px 14px",
              fontSize: "13px",
              fontWeight: 800,
              cursor: "pointer",
            }}
            onClick={() => setIsPlaying((p) => !p)}
            type="button"
          >
            {isPlaying ? "Tạm dừng" : "Chạy tự động"}
          </button>
          <button
            style={{
              border: "1px solid var(--border)",
              borderRadius: "6px",
              background: "var(--panel)",
              color: "var(--foreground)",
              padding: "8px 12px",
              fontWeight: 700,
              cursor: "pointer",
            }}
            disabled={index === 0}
            onClick={() => {
              setIsPlaying(false);
              setIndex((value) => Math.max(0, value - 1));
            }}
            type="button"
          >
            Lùi
          </button>
          <button
            style={{
              border: "1px solid var(--border)",
              borderRadius: "6px",
              background: "var(--panel)",
              color: "var(--foreground)",
              padding: "8px 12px",
              fontWeight: 700,
              cursor: "pointer",
            }}
            disabled={index === frames.length - 1}
            onClick={() => {
              setIsPlaying(false);
              setIndex((value) => Math.min(frames.length - 1, value + 1));
            }}
            type="button"
          >
            Tiếp
          </button>
          <button
            style={{
              border: "1px solid var(--border)",
              borderRadius: "6px",
              background: "var(--panel)",
              color: "var(--foreground)",
              padding: "8px 12px",
              fontWeight: 700,
              cursor: "pointer",
            }}
            onClick={() => reset()}
            type="button"
          >
            Reset
          </button>
          <button
            style={{
              border: "1px solid var(--border)",
              borderRadius: "6px",
              background: "var(--panel)",
              color: "var(--foreground)",
              padding: "8px 12px",
              fontWeight: 700,
              cursor: "pointer",
            }}
            onClick={handleRandom}
            type="button"
          >
            Mảng ngẫu nhiên
          </button>

          <label style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px", color: "var(--muted)", fontWeight: "bold" }}>
            Tốc độ
            <input
              max="2000"
              min="200"
              onChange={(e) => setSpeed(Number(e.target.value))}
              step="50"
              type="range"
              value={speed}
            />
          </label>
        </div>
      </div>
    </section>
  );
}

function buildFrames(kind: SortingKind, customArray: number[]): SortFrame[] {
  if (customArray.length === 0) return [];
  if (kind === "selection") return selectionFrames(customArray);
  if (kind === "insertion") return insertionFrames(customArray);
  if (kind === "quick") return quickFrames(customArray);
  if (kind === "merge") return mergeFrames(customArray);
  if (kind === "counting") return countingFrames(customArray);
  return radixFrames(customArray);
}

function frame(array: number[], active: number[], fixed: number[], label: string, note: string) {
  return { array: [...array], active, fixed, label, note };
}

function selectionFrames(customArray: number[]): SortFrame[] {
  const arr = [...customArray];
  const frames = [frame(arr, [], [], "Bắt đầu", "Tìm phần tử nhỏ nhất và đưa về đầu vùng chưa sắp xếp.")];
  for (let i = 0; i < arr.length - 1; i += 1) {
    let min = i;
    frames.push(frame(arr, [i], range(0, i), `Vị trí ${i}`, "Giả sử phần tử đầu vùng chưa sort là nhỏ nhất."));
    for (let j = i + 1; j < arr.length; j += 1) {
      frames.push(frame(arr, [min, j], range(0, i), "So sánh", `So sánh min ${arr[min]} với ${arr[j]}.`));
      if (arr[j] < arr[min]) min = j;
    }
    [arr[i], arr[min]] = [arr[min], arr[i]];
    frames.push(frame(arr, [i, min], range(0, i + 1), "Đổi chỗ", "Đưa phần tử nhỏ nhất về đúng vị trí."));
  }
  frames.push(frame(arr, [], range(0, arr.length), "Hoàn tất", "Mảng đã được sắp xếp."));
  return frames;
}

function insertionFrames(customArray: number[]): SortFrame[] {
  const arr = [...customArray];
  const frames = [frame(arr, [0], [0], "Bắt đầu", "Vùng đầu tiên xem như đã sắp xếp.")];
  for (let i = 1; i < arr.length; i += 1) {
    const key = arr[i];
    let j = i - 1;
    frames.push(frame(arr, [i], range(0, i), "Chọn key", `Lấy ${key} để chèn vào vùng đã sắp xếp.`));
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      frames.push(frame(arr, [j, j + 1], range(0, i), "Dịch phải", `${arr[j]} lớn hơn key, dịch sang phải.`));
      j -= 1;
    }
    arr[j + 1] = key;
    frames.push(frame(arr, [j + 1], range(0, i + 1), "Chèn key", `Đặt ${key} vào đúng vị trí.`));
  }
  return frames;
}

function quickFrames(customArray: number[]): SortFrame[] {
  const frames: SortFrame[] = [frame(customArray, [], [], "Bắt đầu", "Chọn pivot, partition mảng, rồi xử lý hai nửa.")];
  const arr = [...customArray];
  quickSort(arr, 0, arr.length - 1, frames);
  frames.push(frame(arr, [], range(0, arr.length), "Hoàn tất", "Mảng đã được sắp xếp."));
  return frames;
}

function quickSort(arr: number[], low: number, high: number, frames: SortFrame[]) {
  if (low >= high) return;
  const pivot = arr[high];
  let i = low;
  frames.push(frame(arr, [high], [], "Chọn pivot", `Pivot = ${pivot}.`));
  for (let j = low; j < high; j += 1) {
    frames.push(frame(arr, [j, high], [], "Partition", `So sánh ${arr[j]} với pivot ${pivot}.`));
    if (arr[j] <= pivot) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      frames.push(frame(arr, [i, j], [], "Đổi chỗ", "Đưa phần tử nhỏ hơn pivot sang trái."));
      i += 1;
    }
  }
  [arr[i], arr[high]] = [arr[high], arr[i]];
  frames.push(frame(arr, [i], [i], "Đặt pivot", "Pivot đã về đúng vị trí tương đối."));
  quickSort(arr, low, i - 1, frames);
  quickSort(arr, i + 1, high, frames);
}

function mergeFrames(customArray: number[]): SortFrame[] {
  const frames = [frame(customArray, [], [], "Bắt đầu", "Chia mảng thành các nửa nhỏ, rồi merge lại theo thứ tự.")];
  const arr = [...customArray];
  const mid = Math.floor(arr.length / 2);
  frames.push(frame(arr.slice(0, mid), range(0, mid), [], "Chia trái", `Nửa trái: [${arr.slice(0, mid).join(", ")}].`));
  frames.push(frame(arr.slice(mid), range(0, arr.length - mid), [], "Chia phải", `Nửa phải: [${arr.slice(mid).join(", ")}].`));
  arr.sort((a, b) => a - b);
  frames.push(frame(arr, range(0, arr.length), range(0, arr.length), "Merge", "Trộn các nửa đã sort thành mảng hoàn chỉnh."));
  return frames;
}

function countingFrames(customArray: number[]): SortFrame[] {
  const arr = [...customArray];
  const frames = [frame(arr, [], [], "Bắt đầu", "Đếm số lần xuất hiện của từng giá trị.")];
  const counts = new Array(Math.max(...arr) + 1).fill(0);
  arr.forEach((value, index) => {
    counts[value] += 1;
    frames.push(frame(arr, [index], [], "Đếm", `Giá trị ${value} xuất hiện ${counts[value]} lần.`));
  });
  const output: number[] = [];
  counts.forEach((count, value) => {
    for (let i = 0; i < count; i += 1) output.push(value);
    if (count > 0) frames.push(frame(output, range(output.length - count, output.length), range(0, output.length), "Ghi output", `Ghi ${count} lần giá trị ${value}.`));
  });
  return frames;
}

function radixFrames(customArray: number[]): SortFrame[] {
  const frames = [frame(customArray, [], [], "Bắt đầu", "Sắp xếp theo từng chữ số: hàng đơn vị, hàng chục, hàng trăm.")];
  const step1 = [...customArray].sort((a, b) => (a % 10) - (b % 10));
  frames.push(frame(step1, range(0, step1.length), [], "Hàng đơn vị", "Nhóm theo chữ số cuối."));
  const step2 = [...step1].sort((a, b) => Math.floor((a % 100) / 10) - Math.floor((b % 100) / 10));
  frames.push(frame(step2, range(0, step2.length), [], "Hàng chục", "Tiếp tục stable sort theo hàng chục."));
  const step3 = [...step2].sort((a, b) => Math.floor(a / 100) - Math.floor(b / 100));
  frames.push(frame(step3, [], range(0, step3.length), "Hàng trăm", "Sau chữ số lớn nhất, mảng đã được sắp xếp."));
  return frames;
}

function range(start: number, end: number) {
  return Array.from({ length: Math.max(0, end - start) }, (_, index) => start + index);
}
