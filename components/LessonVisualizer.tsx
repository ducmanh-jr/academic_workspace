"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { SortingVisualizer } from "./SortingVisualizer";
import styles from "./LessonVisualizer.module.css";

type LessonVisualizerProps = {
  slug: string;
};

export function LessonVisualizer({ slug }: LessonVisualizerProps) {
  if (slug === "thuat-toan-la-gi") return <AlgorithmFlowVisualizer />;
  if (slug === "big-o-don-gian") return <BigOVisualizer />;
  if (slug === "linear-search") return <LinearSearchVisualizer />;
  if (slug === "binary-search") return <BinarySearchVisualizer />;
  if (slug === "bubble-sort") return <SortingVisualizer kind="bubble" />;
  if (slug === "selection-sort") return <SortingVisualizer kind="selection" />;
  if (slug === "insertion-sort") return <SortingVisualizer kind="insertion" />;
  if (slug === "quick-sort") return <SortingVisualizer kind="quick" />;
  if (slug === "merge-sort") return <SortingVisualizer kind="merge" />;
  if (slug === "counting-sort") return <SortingVisualizer kind="counting" />;
  if (slug === "radix-sort") return <SortingVisualizer kind="radix" />;

  return null;
}

function AlgorithmFlowVisualizer() {
  const steps = [
    { title: "Input", body: "Dữ liệu đi vào", value: "nước, trà, chanh, đường" },
    { title: "Xử lý", body: "Làm theo từng bước rõ ràng", value: "đun nước → pha trà → thêm chanh" },
    { title: "Output", body: "Kết quả cuối cùng", value: "ly trà chanh" },
  ];
  const [active, setActive] = useState(0);

  return (
    <section className={styles.panel}>
      <VisualizerHeader
        title="Input → Xử lý → Output"
        description="Một thuật toán luôn có dữ liệu đầu vào, các bước xử lý, và kết quả đầu ra."
      />

      <div className={styles.flow}>
        {steps.map((step, index) => (
          <button
            className={active === index ? styles.flowActive : styles.flowStep}
            key={step.title}
            onClick={() => setActive(index)}
            type="button"
          >
            <span>{step.title}</span>
            <small>{step.body}</small>
          </button>
        ))}
      </div>

      <div className={styles.explainer}>
        <strong>{steps[active].title}</strong>
        <p>{steps[active].value}</p>
      </div>
    </section>
  );
}

function BigOVisualizer() {
  const nValues = [10, 100, 1000, 10000, 100000, 1000000];
  const [valIndex, setValIndex] = useState(2); // Default to N = 1000
  const n = nValues[valIndex];

  const series = [
    { label: "O(1)", value: 1, tone: "constant", rawValue: 1 },
    { label: "O(log n)", value: Math.ceil(Math.log2(n)), tone: "log", rawValue: Math.ceil(Math.log2(n)) },
    { label: "O(n)", value: n, tone: "linear", rawValue: n },
    { label: "O(n²)", value: n * n, tone: "square", rawValue: n * n },
  ];
  const max = Math.max(...series.map((item) => item.value));

  function formatVal(num: number): string {
    if (num >= 1e12) return "1 nghìn tỷ (10¹²)";
    if (num >= 1e9) return "1 tỷ (10⁹)";
    if (num >= 1e6) return "1 triệu (10⁶)";
    return num.toLocaleString("vi-VN");
  }

  function estimateTime(operations: number): string {
    const opsPerSec = 1e8; // 100M operations per sec
    const sec = operations / opsPerSec;
    if (sec < 1e-6) return "< 1 micro giây";
    if (sec < 0.001) return "< 1 mili giây";
    if (sec < 1) return `${(sec * 1000).toFixed(1)} mili giây`;
    if (sec < 60) return `${sec.toFixed(2)} giây`;
    if (sec < 3600) return `${(sec / 60).toFixed(1)} phút`;
    return `${(sec / 3600).toFixed(1)} giờ`;
  }

  return (
    <section className={styles.panel}>
      <VisualizerHeader
        title="Big-O Complexity Growth"
        description="Kéo slider vĩ mô để thấy số bước tính toán bùng nổ khi kích thước dữ liệu (N) tăng lên."
      />

      <div className={styles.bigOGrid}>
        <div className={styles.bigOBars} style={{ display: "flex", gap: "16px", alignItems: "end", minHeight: "220px", padding: "12px 0" }}>
          {series.map((item) => (
            <div className={styles.bigOColumn} key={item.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div
                className={`${styles.bigOBar} ${styles[item.tone]}`}
                style={{
                  height: `${Math.max(12, (item.value / max) * 160)}px`,
                  width: "100%",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "11px",
                  fontWeight: "bold",
                  padding: "4px",
                  textAlign: "center"
                }}
              >
                <span style={{ fontSize: "10px", wordBreak: "break-all" }}>{formatVal(item.rawValue)}</span>
              </div>
              <strong style={{ marginTop: "8px", fontSize: "14px" }}>{item.label}</strong>
            </div>
          ))}
        </div>

        <div className={styles.explainer} style={{ border: "1px solid var(--border)", borderRadius: "8px", padding: "16px", background: "var(--panel-subtle)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <span style={{ fontSize: "18px", fontWeight: 800, color: "var(--accent-dark)" }}>
              Kích thước N = {n.toLocaleString("vi-VN")}
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "13px", color: "var(--muted)", marginBottom: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>🚀 O(log n):</span>
              <strong>{series[1].rawValue} bước ({estimateTime(series[1].rawValue)})</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>⚡ O(n):</span>
              <strong>{series[2].rawValue.toLocaleString("vi-VN")} bước ({estimateTime(series[2].rawValue)})</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", color: n >= 10000 ? "#ef4444" : "inherit" }}>
              <span>⚠️ O(n²):</span>
              <strong>{formatVal(series[3].rawValue)} bước ({estimateTime(series[3].rawValue)})</strong>
            </div>
          </div>

          <label className={styles.rangeLabel} style={{ display: "flex", flexDirection: "column", gap: "6px", fontWeight: "bold" }}>
            Điều chỉnh N
            <input
              max="5"
              min="0"
              onChange={(event) => setValIndex(Number(event.target.value))}
              type="range"
              value={valIndex}
              style={{ width: "100%", accentColor: "var(--accent)" }}
            />
          </label>
        </div>
      </div>
    </section>
  );
}

function LinearSearchVisualizer() {
  const values = [4, 2, 7, 1, 9];
  const target = 7;
  const [index, setIndex] = useState(0);
  const done = values[index] === target;

  return (
    <section className={styles.panel}>
      <VisualizerHeader
        title="Linear Search Scan"
        description="Thuật toán kiểm tra từng phần tử từ trái sang phải cho tới khi gặp target."
      />

      <div className={styles.searchRow}>
        {values.map((value, itemIndex) => {
          const className = [
            styles.searchCell,
            itemIndex === index ? styles.currentCell : "",
            itemIndex < index ? styles.checkedCell : "",
            value === target && done ? styles.foundCell : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <div className={className} key={`${value}-${itemIndex}`}>
              <span>{value}</span>
              <small>i={itemIndex}</small>
            </div>
          );
        })}
      </div>

      <div className={styles.controls}>
        <button type="button" onClick={() => setIndex(0)}>
          Reset
        </button>
        <button
          type="button"
          disabled={done || index === values.length - 1}
          onClick={() => setIndex((value) => Math.min(values.length - 1, value + 1))}
        >
          Kiểm tra tiếp
        </button>
      </div>

      <div className={styles.explainer}>
        <strong>{done ? "Tìm thấy" : "Đang kiểm tra"}</strong>
        <p>
          {done
            ? `Giá trị ${target} nằm tại vị trí ${index}.`
            : `${values[index]} chưa phải ${target}, tiếp tục sang phần tử kế bên.`}
        </p>
      </div>
    </section>
  );
}

function BinarySearchVisualizer() {
  const values = [1, 3, 5, 7, 9, 11];
  const target = 7;
  const steps = useMemo(() => {
    const result: Array<{
      left: number;
      right: number;
      mid: number;
      note: string;
      found: boolean;
    }> = [];
    let left = 0;
    let right = values.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const found = values[mid] === target;
      let note = `mid = ${mid}, arr[mid] = ${values[mid]}.`;

      if (found) {
        note += " Tìm thấy target.";
      } else if (values[mid] < target) {
        note += " Target lớn hơn, bỏ nửa trái.";
        left = mid + 1;
      } else {
        note += " Target nhỏ hơn, bỏ nửa phải.";
        right = mid - 1;
      }

      result.push({ left, right, mid, note, found });
      if (found) break;
    }

    return result;
  }, []);
  const [stepIndex, setStepIndex] = useState(0);
  const step = steps[stepIndex];

  return (
    <section className={styles.panel}>
      <VisualizerHeader
        title="Binary Search Range"
        description="Theo dõi left, mid, right và vùng bị loại bỏ sau mỗi lần so sánh."
      />

      <div className={styles.searchRow}>
        {values.map((value, index) => {
          const inRange = index >= step.left && index <= step.right;
          const className = [
            styles.searchCell,
            index === step.mid ? styles.midCell : "",
            !inRange && !step.found ? styles.discardedCell : "",
            step.found && index === step.mid ? styles.foundCell : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <div className={className} key={value}>
              <span>{value}</span>
              <small>
                {index === step.left ? "L " : ""}
                {index === step.mid ? "M " : ""}
                {index === step.right ? "R" : ""}
              </small>
            </div>
          );
        })}
      </div>

      <div className={styles.controls}>
        <button type="button" onClick={() => setStepIndex(0)}>
          Reset
        </button>
        <button
          type="button"
          disabled={stepIndex === steps.length - 1}
          onClick={() => setStepIndex((value) => Math.min(steps.length - 1, value + 1))}
        >
          Bước tiếp
        </button>
      </div>

      <div className={styles.explainer}>
        <strong>Bước {stepIndex + 1}</strong>
        <p>{step.note}</p>
      </div>
    </section>
  );
}

function VisualizerHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <header className={styles.header}>
      <p className={styles.kicker}>Mô phỏng tương tác</p>
      <h3>{title}</h3>
      <p>{description}</p>
    </header>
  );
}
