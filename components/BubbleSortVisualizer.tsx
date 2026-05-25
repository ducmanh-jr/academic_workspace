// BubbleSortVisualizer.tsx
"use client";

import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import styles from "./BubbleSortVisualizer.module.css";

// Initial array for the visualizer
const initialArray = [7, 12, 9, 11, 3];

// Types for steps
type StepAction = "compare" | "swap" | "mark" | "done";
interface SortStep {
  array: number[];
  comparing: number[];
  sorted: number[];
  action: StepAction;
  note: string;
  pass: number;
}

// Generate random array for demo
function randomArray(): number[] {
  return Array.from({ length: 6 + Math.floor(Math.random() * 3) }, () => Math.floor(Math.random() * 80) + 12);
}

// Build steps for Bubble Sort algorithm
function buildBubbleSortSteps(values: number[]): SortStep[] {
  const arr = [...values];
  const steps: SortStep[] = [];
  steps.push({
    array: [...arr],
    comparing: [],
    sorted: [],
    action: "compare",
    note: "Bắt đầu với mảng chưa sắp xếp.",
    pass: 0,
  });

  for (let end = arr.length - 1; end > 0; end--) {
    let swapped = false;
    const pass = arr.length - end;
    for (let i = 0; i < end; i++) {
      steps.push({
        array: [...arr],
        comparing: [i, i + 1],
        sorted: Array.from({ length: arr.length - 1 - end }, (_, idx) => end + 1 + idx),
        action: "compare",
        note: `So sánh ${arr[i]} và ${arr[i + 1]}.`,
        pass,
      });
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
        steps.push({
          array: [...arr],
          comparing: [i, i + 1],
          sorted: Array.from({ length: arr.length - 1 - end }, (_, idx) => end + 1 + idx),
          action: "swap",
          note: `Đổi chỗ vì ${arr[i]} nhỏ hơn ${arr[i + 1]}.`,
          pass,
        });
      }
    }
    steps.push({
      array: [...arr],
      comparing: [],
      sorted: Array.from({ length: arr.length - end }, (_, idx) => end + idx),
      action: "mark",
      note: `Kết thúc lượt ${pass}: phần tử lớn nhất đã ở vị trí đúng.`,
      pass,
    });
    if (!swapped) break;
  }

  steps.push({
    array: [...arr],
    comparing: [],
    sorted: arr.map((_, idx) => idx),
    action: "done",
    note: "Mảng đã được sắp xếp.",
    pass: arr.length - 1,
  });

  return steps;
}

// Main visualizer component (memoized for performance)
export const BubbleSortVisualizer = React.memo(function BubbleSortVisualizer() {

  const [values, setValues] = useState(initialArray);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(700);
  const [inputVal, setInputVal] = useState("7, 12, 9, 11, 3");
  const [errorMsg, setErrorMsg] = useState("");
  const timerRef = useRef<number | null>(null);

  const steps = useMemo(() => buildBubbleSortSteps(values), [values]);
  const current = steps[stepIndex] ?? steps[0];
  const maxValue = Math.max(...current.array);



  // Auto‑play logic
  useEffect(() => {
    if (!isPlaying) return;
    if (stepIndex >= steps.length - 1) {
      setIsPlaying(false);
      return;
    }
    timerRef.current = window.setTimeout(() => {
      setStepIndex((i) => Math.min(i + 1, steps.length - 1));
    }, speed);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [isPlaying, speed, stepIndex, steps.length]);

  const reset = useCallback((newVals = values) => {
    setIsPlaying(false);
    setValues(newVals);
    setStepIndex(0);
    setErrorMsg("");
  }, [values]);

  const handleApplyCustom = useCallback(() => {
    setErrorMsg("");
    const parts = inputVal.split(",").map((p) => p.trim());
    const parsed: number[] = [];
    for (const part of parts) {
      if (!part) continue;
      const num = Number(part);
      if (isNaN(num)) {
        setErrorMsg("Chỉ nhập số nguyên cách nhau bởi dấu phẩy.");
        return;
      }
      if (num < 1 || num > 99) {
        setErrorMsg("Mỗi phần tử phải từ 1 đến 99.");
        return;
      }
      parsed.push(num);
    }
    if (parsed.length < 3 || parsed.length > 10) {
      setErrorMsg("Độ dài mảng phải từ 3 đến 10 phần tử.");
      return;
    }
    reset(parsed);
  }, [inputVal, reset]);

  const handleRandom = useCallback(() => {
    const arr = randomArray();
    setInputVal(arr.join(", "));
    reset(arr);
  }, [reset]);

  return (
    <section
      className={styles.visualizer}
      aria-label="Mô phỏng Bubble Sort"
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (target.closest("button, input, label, select, textarea")) return;
        setIsPlaying((prev) => !prev);
      }}
      style={{ cursor: "pointer" }}
    >
      <div className={styles.header}>
        <div>
          <p className={styles.kicker}>Mô phỏng tương tác</p>
          <h3>Bubble Sort Visualizer</h3>
          <p>Quan sát từng lần so sánh, đổi chỗ và phần tử đã về đúng vị trí.</p>
        </div>
        <div className={styles.status}>
          <span>Bước {stepIndex + 1}/{steps.length}</span>
          <span>Lượt {current.pass}</span>
        </div>
      </div>

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
            onClick={(e) => { e.stopPropagation(); handleApplyCustom(); }}
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
        <div className={styles.bars} aria-label="Các cột giá trị">
          {current.array.map((value, index) => {
            const isComparing = current.comparing.includes(index);
            const isSorted = current.sorted.includes(index);
            const className = [
              styles.bar,
              isComparing ? styles.comparing : "",
              current.action === "swap" && isComparing ? styles.swapping : "",
              isSorted ? styles.sorted : "",
            ]
              .filter(Boolean)
              .join(" ");
            return (
              <div className={styles.barSlot} key={index}> 
                <div className={className} style={{ height: `${Math.max(14, (value / maxValue) * 100)}%` }}>
                  <span>{value}</span>
                </div>
              </div>
            );
          })}
        </div>

        <aside className={styles.explainBox}>
          <strong>
            {current.action === "compare" && "Đang so sánh"}
            {current.action === "swap" && "Đang đổi chỗ"}
            {current.action === "mark" && "Đánh dấu đã đúng"}
            {current.action === "done" && "Hoàn tất"}
          </strong>
          <p>{current.note}</p>
          <div className={styles.legend}>
            <span><i className={styles.compareDot} /> So sánh</span>
            <span><i className={styles.swapDot} /> Đổi chỗ</span>
            <span><i className={styles.doneDot} /> Đã sort</span>
          </div>
        </aside>
      </div>

      <div className={styles.controls}>
        <button type="button" onClick={(e) => { e.stopPropagation(); setIsPlaying((v) => !v); }}>{isPlaying ? "Tạm dừng" : "Chạy tự động"}</button>
        <button type="button" onClick={(e) => { e.stopPropagation(); setStepIndex((i) => Math.max(0, i - 1)); }} disabled={stepIndex === 0}>Lùi 1 bước</button>
        <button type="button" onClick={(e) => { e.stopPropagation(); setStepIndex((i) => Math.min(steps.length - 1, i + 1)); }} disabled={stepIndex === steps.length - 1}>Tới 1 bước</button>
        <button type="button" onClick={(e) => { e.stopPropagation(); reset(); }}>Reset</button>
        <button type="button" onClick={(e) => { e.stopPropagation(); handleRandom(); }}>Mảng ngẫu nhiên</button>
        <label>
          Tốc độ
          <input
            max="1100"
            min="180"
            onChange={(e) => setSpeed(Number(e.target.value))}
            step="40"
            type="range"
            value={speed}
          />
        </label>
      </div>
    </section>
  );
});
