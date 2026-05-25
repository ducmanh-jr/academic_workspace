"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./SortingVisualizer.module.css";

type SortingKind = "bubble" | "selection" | "insertion" | "quick" | "merge" | "counting" | "radix";
type FrameAction = "compare" | "swap" | "mark" | "done";
type PresetKey = "nearly" | "reverse" | "duplicates";

interface SortFrame {
  array: number[];
  active: number[];
  fixed: number[];
  note: string;
  label: string;
  action: FrameAction;
  vars?: Record<string, string | number>;
}

const speedPresets = [
  { label: "Chậm", value: 1200 },
  { label: "Vừa", value: 700 },
  { label: "Nhanh", value: 280 },
];

const defaultArrays: Record<SortingKind, number[]> = {
  bubble: [7, 12, 9, 11, 3],
  selection: [7, 12, 9, 11, 3],
  insertion: [7, 12, 9, 11, 3],
  quick: [7, 12, 9, 11, 3],
  merge: [7, 12, 9, 11, 3],
  counting: [4, 2, 2, 8, 3, 3, 1],
  radix: [170, 45, 75, 90, 802, 24, 2, 66],
};

const labels: Record<SortingKind, string> = {
  bubble: "Bubble Sort",
  selection: "Selection Sort",
  insertion: "Insertion Sort",
  quick: "Quick Sort",
  merge: "Merge Sort",
  counting: "Counting Sort",
  radix: "Radix Sort",
};

const descriptions: Record<SortingKind, string> = {
  bubble: "Quan sát từng lần so sánh, đổi chỗ và phần tử đã về đúng vị trí.",
  selection: "Quan sát cách chọn phần tử nhỏ nhất và đưa về đầu vùng chưa sắp xếp.",
  insertion: "Theo dõi key được chọn, các phần tử bị dịch phải và vị trí chèn cuối cùng.",
  quick: "Quan sát pivot, quá trình partition và các phần tử được đặt đúng vị trí.",
  merge: "Theo dõi cách chia mảng thành các phần nhỏ rồi merge lại theo thứ tự.",
  counting: "Quan sát cách đếm tần suất từng giá trị rồi ghi lại mảng đầu ra.",
  radix: "Theo dõi quá trình sắp xếp ổn định theo từng chữ số từ phải sang trái.",
};

const presetLabels: Record<PresetKey, string> = {
  nearly: "Gần sort",
  reverse: "Đảo ngược",
  duplicates: "Nhiều trùng",
};

const presets: Record<SortingKind, Record<PresetKey, number[]>> = {
  bubble: {
    nearly: [3, 7, 9, 12, 11],
    reverse: [15, 12, 9, 7, 3],
    duplicates: [8, 3, 8, 5, 3, 9],
  },
  selection: {
    nearly: [3, 7, 9, 12, 11],
    reverse: [15, 12, 9, 7, 3],
    duplicates: [8, 3, 8, 5, 3, 9],
  },
  insertion: {
    nearly: [3, 7, 9, 12, 11],
    reverse: [15, 12, 9, 7, 3],
    duplicates: [8, 3, 8, 5, 3, 9],
  },
  quick: {
    nearly: [3, 7, 9, 12, 11],
    reverse: [15, 12, 9, 7, 3],
    duplicates: [8, 3, 8, 5, 3, 9],
  },
  merge: {
    nearly: [3, 7, 9, 12, 11],
    reverse: [15, 12, 9, 7, 3],
    duplicates: [8, 3, 8, 5, 3, 9],
  },
  counting: {
    nearly: [1, 2, 2, 3, 4, 4, 5],
    reverse: [8, 7, 6, 5, 4, 3, 2],
    duplicates: [4, 2, 2, 8, 3, 3, 1],
  },
  radix: {
    nearly: [12, 24, 45, 66, 75, 90, 170],
    reverse: [802, 170, 90, 75, 66, 45, 24],
    duplicates: [170, 45, 170, 90, 45, 24, 90],
  },
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

  useEffect(() => {
    const arr = defaultArrays[kind];
    setValues(arr);
    setInputVal(arr.join(", "));
    setIndex(0);
    setIsPlaying(false);
    setErrorMsg("");
  }, [kind]);

  const frames = useMemo(() => buildFrames(kind, values), [kind, values]);
  const frame = frames[index] ?? frames[0] ?? emptyFrame();
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
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [isPlaying, speed, index, frames.length]);

  const reset = useCallback((newValues = values) => {
    setIsPlaying(false);
    setValues(newValues);
    setIndex(0);
    setErrorMsg("");
  }, [values]);

  const handleApplyCustom = useCallback(() => {
    setErrorMsg("");
    const parts = inputVal.split(",").map((p) => p.trim());
    const parsed: number[] = [];

    for (const part of parts) {
      if (part === "") continue;
      const num = Number(part);
      if (!Number.isInteger(num)) {
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
  }, [inputVal, kind, reset]);

  const handleRandom = useCallback(() => {
    setErrorMsg("");
    const len = 5 + Math.floor(Math.random() * 4);
    let arr: number[];

    if (kind === "radix") {
      arr = Array.from({ length: len }, () => Math.floor(Math.random() * 900) + 10);
    } else if (kind === "counting") {
      arr = Array.from({ length: len + 1 }, () => Math.floor(Math.random() * 9) + 1);
    } else {
      arr = Array.from({ length: len }, () => Math.floor(Math.random() * 80) + 12);
    }

    setInputVal(arr.join(", "));
    reset(arr);
  }, [kind, reset]);

  const handlePreset = useCallback((preset: PresetKey) => {
    const arr = presets[kind][preset];
    setInputVal(arr.join(", "));
    reset(arr);
  }, [kind, reset]);

  return (
    <section
      aria-label={`Mô phỏng ${labels[kind]}`}
      className={styles.panel}
      onClick={(event) => {
        const target = event.target as HTMLElement;
        if (target.closest("button, input, label, select, textarea")) return;
        setIsPlaying((prev) => !prev);
      }}
    >
      <header className={styles.header}>
        <div>
          <p className={styles.kicker}>Mô phỏng tương tác</p>
          <h3>{labels[kind]} Visualizer</h3>
          <p>{descriptions[kind]}</p>
        </div>
        <div className={styles.status}>
          <span>Bước {index + 1}/{frames.length}</span>
          <span>{frame.label}</span>
        </div>
      </header>

      <div className={styles.inputArea}>
        <div className={styles.inputRow}>
          <input
            onChange={(event) => setInputVal(event.target.value)}
            placeholder="Nhập mảng ví dụ: 5, 2, 9, 1"
            type="text"
            value={inputVal}
          />
          <button
            onClick={(event) => {
              event.stopPropagation();
              handleApplyCustom();
            }}
            type="button"
          >
            Áp dụng
          </button>
        </div>
        {errorMsg ? <span className={styles.errorText}>{errorMsg}</span> : null}
        <div className={styles.presetRow} aria-label="Bộ dữ liệu mẫu">
          {(Object.keys(presetLabels) as PresetKey[]).map((preset) => (
            <button
              key={preset}
              onClick={(event) => {
                event.stopPropagation();
                handlePreset(preset);
              }}
              type="button"
            >
              {presetLabels[preset]}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.stage}>
        <div className={styles.bars} aria-label="Các cột giá trị">
          {frame.array.map((value, itemIndex) => {
            const isActive = frame.active.includes(itemIndex);
            const isFixed = frame.fixed.includes(itemIndex);
            const className = [
              styles.bar,
              isActive ? styles.comparing : "",
              frame.action === "swap" && isActive ? styles.swapping : "",
              isFixed ? styles.sorted : "",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <div className={styles.slot} key={`${value}-${itemIndex}`}>
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

        <aside className={styles.explainBox}>
          <strong>{actionTitle(frame.action)}</strong>
          <small>{actionDetail(frame.action)}</small>
          <p>{frame.note}</p>
          <VariablePanel vars={frame.vars} />
          <StepQuiz frame={frame} kind={kind} />
          <div className={styles.legend}>
            <span><i className={styles.compareDot} /> So sánh / xử lý</span>
            <span><i className={styles.swapDot} /> Đổi chỗ / ghi</span>
            <span><i className={styles.doneDot} /> Đã sort</span>
          </div>
        </aside>
      </div>

      <div className={styles.controls}>
        <button
          onClick={(event) => {
            event.stopPropagation();
            setIsPlaying((p) => !p);
          }}
          type="button"
        >
          {isPlaying ? "Tạm dừng" : "Chạy tự động"}
        </button>
        <button
          disabled={index === 0}
          onClick={(event) => {
            event.stopPropagation();
            setIsPlaying(false);
            setIndex((value) => Math.max(0, value - 1));
          }}
          type="button"
        >
          Lùi 1 bước
        </button>
        <button
          disabled={index === frames.length - 1}
          onClick={(event) => {
            event.stopPropagation();
            setIsPlaying(false);
            setIndex((value) => Math.min(frames.length - 1, value + 1));
          }}
          type="button"
        >
          Tới 1 bước
        </button>
        <button
          onClick={(event) => {
            event.stopPropagation();
            reset();
          }}
          type="button"
        >
          Reset
        </button>
        <button
          onClick={(event) => {
            event.stopPropagation();
            handleRandom();
          }}
          type="button"
        >
          Mảng ngẫu nhiên
        </button>
        <div className={styles.speedGroup} aria-label="Chọn tốc độ">
          {speedPresets.map((preset) => (
            <button
              className={Math.abs(speed - preset.value) <= 80 ? styles.speedActive : ""}
              key={preset.label}
              onClick={(event) => {
                event.stopPropagation();
                setSpeed(preset.value);
              }}
              type="button"
            >
              {preset.label}
            </button>
          ))}
        </div>
        <label>
          Tốc độ
          <input
            max="2000"
            min="200"
            onChange={(event) => setSpeed(Number(event.target.value))}
            step="50"
            type="range"
            value={speed}
          />
        </label>
      </div>

      <StepTimeline
        currentIndex={index}
        steps={frames}
        onSelect={(nextIndex) => {
          setIsPlaying(false);
          setIndex(nextIndex);
        }}
      />

      <SortRaceComparison values={values} />

      <SortingCodeTrace action={frame.action} kind={kind} label={frame.label} />
    </section>
  );
}

const PSEUDOCODE: Record<SortingKind, string[]> = {
  bubble: [
    "for end = n-1 downto 1:",
    "  for i = 0 to end-1:",
    "    if arr[i] > arr[i+1]:",
    "      swap(arr[i], arr[i+1])",
    "  // end đã ở đúng vị trí",
    "return arr  // Hoàn tất",
  ],
  selection: [
    "for i = 0 to n-2:",
    "  min = i",
    "  for j = i+1 to n-1:",
    "    if arr[j] < arr[min]: min = j",
    "  swap(arr[i], arr[min])",
    "return arr  // Hoàn tất",
  ],
  insertion: [
    "for i = 1 to n-1:",
    "  key = arr[i]",
    "  j = i - 1",
    "  while j >= 0 and arr[j] > key:",
    "    arr[j+1] = arr[j]; j--",
    "  arr[j+1] = key",
    "return arr  // Hoàn tất",
  ],
  quick: [
    "quickSort(arr, low, high):",
    "  pivot = arr[high]",
    "  i = low",
    "  for j = low to high-1:",
    "    if arr[j] <= pivot: swap(i,j); i++",
    "  swap(arr[i], arr[high])",
    "  recurse left & right",
  ],
  merge: [
    "mergeSort(arr):",
    "  mid = len(arr) / 2",
    "  left  = mergeSort(arr[:mid])",
    "  right = mergeSort(arr[mid:])",
    "  return merge(left, right)",
  ],
  counting: [
    "count = array of zeros",
    "for x in arr: count[x]++",
    "output = []",
    "for val in range(max):",
    "  repeat count[val] times:",
    "    output.append(val)",
  ],
  radix: [
    "for digit = 1, 10, 100...:",
    "  buckets = [[] for _ in 0..9]",
    "  for x in arr:",
    "    buckets[(x/digit) % 10].append(x)",
    "  arr = concat(buckets)",
  ],
};

function labelToActiveLines(kind: SortingKind, label: string, action: FrameAction): number[] {
  if (action === "done") return [PSEUDOCODE[kind].length - 1];

  switch (kind) {
    case "bubble":
      if (action === "swap") return [2, 3];
      if (action === "mark") return [0, 4];
      return [0, 1, 2];
    case "selection":
      if (action === "swap") return [4];
      if (label.includes("So sánh")) return [2, 3];
      return [0, 1];
    case "insertion":
      if (label.includes("Chọn")) return [0, 1, 2];
      if (label.includes("Dịch")) return [3, 4];
      if (label.includes("Chèn")) return [5];
      return [0];
    case "quick":
      if (label.includes("pivot") || label.includes("Pivot")) return [0, 1];
      if (action === "swap") return [4, 5];
      if (label.includes("Partition")) return [3, 4];
      return [0, 6];
    case "merge":
      if (label.includes("trái")) return [1, 2];
      if (label.includes("phải")) return [1, 3];
      if (label.includes("Merge")) return [4];
      return [0];
    case "counting":
      if (label.includes("Đếm")) return [1];
      if (label.includes("Ghi")) return [3, 4, 5];
      return [0];
    case "radix":
      if (label.includes("Hàng")) return [0, 2, 3, 4];
      return [0];
    default:
      return [0];
  }
}

function SortingCodeTrace({
  action,
  kind,
  label,
}: {
  action: FrameAction;
  kind: SortingKind;
  label: string;
}) {
  const lines = PSEUDOCODE[kind];
  const activeLines = labelToActiveLines(kind, label, action);

  return (
    <div className={styles.codeTrace}>
      <div className={styles.codeTraceHeader}>
        <span /> Pseudocode — {labels[kind]}
      </div>
      {lines.map((line, i) => (
        <div
          className={`${styles.codeLine} ${activeLines.includes(i) ? styles.codeLineActive : ""}`}
          key={line}
        >
          <span className={styles.lineNum}>{i + 1}</span>
          <code>{line}</code>
        </div>
      ))}
    </div>
  );
}

function buildFrames(kind: SortingKind, customArray: number[]): SortFrame[] {
  if (customArray.length === 0) return [];
  if (kind === "bubble") return bubbleFrames(customArray);
  if (kind === "selection") return selectionFrames(customArray);
  if (kind === "insertion") return insertionFrames(customArray);
  if (kind === "quick") return quickFrames(customArray);
  if (kind === "merge") return mergeFrames(customArray);
  if (kind === "counting") return countingFrames(customArray);
  return radixFrames(customArray);
}

function bubbleFrames(customArray: number[]): SortFrame[] {
  const arr = [...customArray];
  const frames = [
    frame(arr, [], [], "Bắt đầu", "Bắt đầu với mảng chưa sắp xếp.", "compare", { n: arr.length }),
  ];

  for (let end = arr.length - 1; end > 0; end -= 1) {
    let swapped = false;
    const pass = arr.length - end;

    for (let i = 0; i < end; i += 1) {
      frames.push(frame(
        arr,
        [i, i + 1],
        range(end + 1, arr.length),
        "So sánh",
        `So sánh ${arr[i]} và ${arr[i + 1]}.`,
        "compare",
        { end, i, "arr[i]": arr[i], "arr[i+1]": arr[i + 1] },
      ));

      if (arr[i] > arr[i + 1]) {
        const left = arr[i];
        const right = arr[i + 1];
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
        frames.push(frame(
          arr,
          [i, i + 1],
          range(end + 1, arr.length),
          "Đổi chỗ",
          `Vì ${left} > ${right}, đổi chỗ để giá trị lớn hơn nổi dần sang phải.`,
          "swap",
          { end, i, left, right },
        ));
      }
    }

    frames.push(frame(
      arr,
      [end],
      range(end, arr.length),
      "Đánh dấu",
      `Kết thúc lượt ${pass}: phần tử lớn nhất đã ở vị trí đúng.`,
      "mark",
      { end, pass },
    ));

    if (!swapped) break;
  }

  frames.push(frame(arr, [], range(0, arr.length), "Hoàn tất", "Mảng đã được sắp xếp.", "done", { n: arr.length, sorted: arr.length }));
  return frames;
}

function frame(
  array: number[],
  active: number[],
  fixed: number[],
  label: string,
  note: string,
  action: FrameAction = "compare",
  vars?: Record<string, string | number>,
) {
  return { array: [...array], active, fixed, label, note, action, vars };
}

function emptyFrame(): SortFrame {
  return frame([], [], [], "Bắt đầu", "", "compare");
}

function actionTitle(action: FrameAction) {
  if (action === "swap") return "Đang đổi chỗ";
  if (action === "mark") return "Đánh dấu đã đúng";
  if (action === "done") return "Hoàn tất";
  return "Đang so sánh";
}

function actionDetail(action: FrameAction) {
  if (action === "swap") return "Mảng thay đổi ở bước này.";
  if (action === "mark") return "Một vùng hoặc phần tử vừa được xác nhận đúng.";
  if (action === "done") return "Toàn bộ mảng đã ở thứ tự tăng dần.";
  return "Quan sát phần tử đang được thuật toán kiểm tra.";
}

function StepTimeline({
  currentIndex,
  onSelect,
  steps,
}: {
  currentIndex: number;
  onSelect: (index: number) => void;
  steps: SortFrame[];
}) {
  return (
    <div className={styles.timeline} aria-label="Timeline các bước">
      <div className={styles.timelineHeader}>
        <span>Timeline</span>
        <strong>{Math.round(((currentIndex + 1) / steps.length) * 100)}%</strong>
      </div>
      <div className={styles.timelineTrack}>
        {steps.map((step, stepIndex) => {
          const isCurrent = stepIndex === currentIndex;
          const isPast = stepIndex < currentIndex;

          return (
            <button
              aria-label={`Tới bước ${stepIndex + 1}: ${step.label}`}
              className={[
                styles.timelineDot,
                isCurrent ? styles.timelineCurrent : "",
                isPast ? styles.timelinePast : "",
              ].filter(Boolean).join(" ")}
              key={`${step.label}-${stepIndex}`}
              onClick={(event) => {
                event.stopPropagation();
                onSelect(stepIndex);
              }}
              title={`Bước ${stepIndex + 1}: ${step.label}`}
              type="button"
            />
          );
        })}
      </div>
    </div>
  );
}

function VariablePanel({ vars }: { vars?: Record<string, string | number> }) {
  if (!vars || Object.keys(vars).length === 0) return null;

  return (
    <div className={styles.variablePanel} aria-label="Biến thuật toán">
      <strong className={styles.panelEyebrow}>Biến thuật toán</strong>
      {Object.entries(vars).map(([name, value]) => (
        <span key={name}>
          <code>{name}</code>
          <strong>{value}</strong>
        </span>
      ))}
    </div>
  );
}

function StepQuiz({ frame, kind }: { frame: SortFrame; kind: SortingKind }) {
  const [answer, setAnswer] = useState<null | boolean>(null);

  useEffect(() => {
    setAnswer(null);
  }, [frame]);

  const quiz = buildStepQuiz(frame, kind);
  if (!quiz) return null;

  return (
    <div className={styles.stepQuiz}>
      <span className={styles.panelEyebrow}>Dự đoán nhanh</span>
      <strong>{quiz.question}</strong>
      <div>
        <button
          className={answer === true ? (quiz.answer ? styles.quizCorrect : styles.quizWrong) : ""}
          onClick={(event) => {
            event.stopPropagation();
            setAnswer(true);
          }}
          type="button"
        >
          Có
        </button>
        <button
          className={answer === false ? (!quiz.answer ? styles.quizCorrect : styles.quizWrong) : ""}
          onClick={(event) => {
            event.stopPropagation();
            setAnswer(false);
          }}
          type="button"
        >
          Không
        </button>
      </div>
      {answer !== null ? (
        <p>{answer === quiz.answer ? "Đúng rồi." : "Chưa đúng."} {quiz.explanation}</p>
      ) : null}
    </div>
  );
}

function buildStepQuiz(frame: SortFrame, kind: SortingKind) {
  if (kind === "insertion" && frame.action === "compare") {
    const key = frame.vars?.key;
    const j = frame.vars?.j;
    if (typeof key === "number" && typeof j === "number" && j >= 0) {
      const current = frame.array[j];
      const shouldShift = current > key;
      return {
        answer: shouldShift,
        explanation: shouldShift
          ? `${current} > key ${key}, nên phần tử này sẽ được dịch sang phải.`
          : `${current} <= key ${key}, nên key có thể đặt sau vị trí này.`,
        question: `${current} có lớn hơn key ${key} không?`,
      };
    }
  }

  if (frame.action !== "compare" || frame.active.length < 2) return null;
  const [leftIndex, rightIndex] = frame.active;
  const left = frame.array[leftIndex];
  const right = frame.array[rightIndex];
  if (left === undefined || right === undefined) return null;

  if (kind === "quick") {
    return {
      answer: left <= right,
      explanation: left <= right
        ? `${left} <= pivot ${right}, nên phần tử này được đưa sang vùng bên trái.`
        : `${left} > pivot ${right}, nên phần tử này tạm ở vùng bên phải.`,
      question: `${left} có nhỏ hơn hoặc bằng pivot ${right} không?`,
    };
  }

  if (kind === "selection") {
    return {
      answer: right < left,
      explanation: right < left
        ? `${right} nhỏ hơn min hiện tại ${left}, nên min sẽ được cập nhật.`
        : `${right} không nhỏ hơn min hiện tại ${left}, nên giữ min cũ.`,
      question: `${right} có nhỏ hơn min hiện tại ${left} không?`,
    };
  }

  return {
    answer: left > right,
    explanation: left > right
      ? `${left} > ${right}, thứ tự hiện tại cần được xử lý.`
      : `${left} <= ${right}, cặp này đang đúng thứ tự.`,
    question: `${left} có lớn hơn ${right} không?`,
  };
}

function SortRaceComparison({ values }: { values: number[] }) {
  const stats = useMemo(() => compareSimpleSorts(values), [values]);
  const maxSteps = Math.max(...stats.map((item) => item.comparisons), 1);

  return (
    <div className={styles.racePanel}>
      <div className={styles.raceHeader}>
        <span>So sánh song song</span>
        <strong>[{values.join(", ")}]</strong>
      </div>
      <div className={styles.raceGrid}>
        {stats.map((item) => (
          <article key={item.name}>
            <div>
              <strong>{item.name}</strong>
              <span>{item.output.join(", ")}</span>
            </div>
            <div className={styles.raceMeter}>
              <i style={{ width: `${Math.max(8, (item.comparisons / maxSteps) * 100)}%` }} />
            </div>
            <p>{item.comparisons} so sánh · {item.swaps} đổi chỗ</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function compareSimpleSorts(values: number[]) {
  return [
    bubbleStats(values),
    selectionStats(values),
    insertionStats(values),
  ];
}

function bubbleStats(values: number[]) {
  const arr = [...values];
  let comparisons = 0;
  let swaps = 0;
  for (let end = arr.length - 1; end > 0; end -= 1) {
    for (let i = 0; i < end; i += 1) {
      comparisons += 1;
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swaps += 1;
      }
    }
  }
  return { comparisons, name: "Bubble", output: arr, swaps };
}

function selectionStats(values: number[]) {
  const arr = [...values];
  let comparisons = 0;
  let swaps = 0;
  for (let i = 0; i < arr.length - 1; i += 1) {
    let min = i;
    for (let j = i + 1; j < arr.length; j += 1) {
      comparisons += 1;
      if (arr[j] < arr[min]) min = j;
    }
    if (min !== i) swaps += 1;
    [arr[i], arr[min]] = [arr[min], arr[i]];
  }
  return { comparisons, name: "Selection", output: arr, swaps };
}

function insertionStats(values: number[]) {
  const arr = [...values];
  let comparisons = 0;
  let swaps = 0;
  for (let i = 1; i < arr.length; i += 1) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0) {
      comparisons += 1;
      if (arr[j] <= key) break;
      arr[j + 1] = arr[j];
      swaps += 1;
      j -= 1;
    }
    arr[j + 1] = key;
  }
  return { comparisons, name: "Insertion", output: arr, swaps };
}

function selectionFrames(customArray: number[]): SortFrame[] {
  const arr = [...customArray];
  const frames = [frame(arr, [], [], "Bắt đầu", "Tìm phần tử nhỏ nhất và đưa về đầu vùng chưa sắp xếp.", "mark", { n: arr.length, sorted: 0 })];

  for (let i = 0; i < arr.length - 1; i += 1) {
    let min = i;
    frames.push(frame(arr, [i], range(0, i), `Vị trí ${i}`, "Giả sử phần tử đầu vùng chưa sort là nhỏ nhất.", "compare", { i, min }));

    for (let j = i + 1; j < arr.length; j += 1) {
      frames.push(frame(arr, [min, j], range(0, i), "So sánh", `So sánh min ${arr[min]} với ${arr[j]}.`, "compare", { i, j, min, "arr[min]": arr[min], "arr[j]": arr[j] }));
      if (arr[j] < arr[min]) min = j;
    }

    [arr[i], arr[min]] = [arr[min], arr[i]];
    frames.push(frame(arr, [i, min], range(0, i + 1), "Đổi chỗ", "Đưa phần tử nhỏ nhất về đúng vị trí.", "swap", { i, min }));
  }

  frames.push(frame(arr, [], range(0, arr.length), "Hoàn tất", "Mảng đã được sắp xếp.", "done", { n: arr.length, sorted: arr.length }));
  return frames;
}

function insertionFrames(customArray: number[]): SortFrame[] {
  const arr = [...customArray];
  const frames = [frame(arr, [0], [0], "Bắt đầu", "Vùng đầu tiên xem như đã sắp xếp.", "mark", { n: arr.length, sorted: 1 })];

  for (let i = 1; i < arr.length; i += 1) {
    const key = arr[i];
    let j = i - 1;
    frames.push(frame(arr, [i], range(0, i), "Chọn key", `Lấy ${key} để chèn vào vùng đã sắp xếp.`, "compare", { i, key, j }));

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      frames.push(frame(arr, [j, j + 1], range(0, i), "Dịch phải", `${arr[j]} lớn hơn key, dịch sang phải.`, "swap", { i, j, key }));
      j -= 1;
    }

    arr[j + 1] = key;
    frames.push(frame(arr, [j + 1], range(0, i + 1), "Chèn key", `Đặt ${key} vào đúng vị trí.`, "mark", { i, "vị trí chèn": j + 1, key }));
  }

  frames.push(frame(arr, [], range(0, arr.length), "Hoàn tất", "Mảng đã được sắp xếp.", "done", { n: arr.length, sorted: arr.length }));
  return frames;
}

function quickFrames(customArray: number[]): SortFrame[] {
  const frames: SortFrame[] = [frame(customArray, [], [], "Bắt đầu", "Chọn pivot, partition mảng, rồi xử lý hai nửa.", "mark", { n: customArray.length, low: 0, high: customArray.length - 1 })];
  const arr = [...customArray];
  const fixed = new Set<number>();

  quickSort(arr, 0, arr.length - 1, frames, fixed);
  frames.push(frame(arr, [], range(0, arr.length), "Hoàn tất", "Mảng đã được sắp xếp.", "done", { n: arr.length, sorted: arr.length }));
  return frames;
}

function quickSort(arr: number[], low: number, high: number, frames: SortFrame[], fixed: Set<number>) {
  if (low > high) return;
  if (low === high) {
    fixed.add(low);
    frames.push(frame(arr, [low], Array.from(fixed), "Đánh dấu", `${arr[low]} đã ở đúng vị trí.`, "mark", { low, high }));
    return;
  }

  const pivot = arr[high];
  let i = low;
  frames.push(frame(arr, [high], Array.from(fixed), "Chọn pivot", `Pivot = ${pivot}.`, "compare", { low, high, pivot, i }));

  for (let j = low; j < high; j += 1) {
    frames.push(frame(arr, [j, high], Array.from(fixed), "Partition", `So sánh ${arr[j]} với pivot ${pivot}.`, "compare", { low, high, i, j, pivot }));
    if (arr[j] <= pivot) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      frames.push(frame(arr, [i, j], Array.from(fixed), "Đổi chỗ", "Đưa phần tử nhỏ hơn pivot sang trái.", "swap", { i, j, pivot }));
      i += 1;
    }
  }

  [arr[i], arr[high]] = [arr[high], arr[i]];
  fixed.add(i);
  frames.push(frame(arr, [i], Array.from(fixed), "Đặt pivot", "Pivot đã về đúng vị trí tương đối.", "mark", { i, pivot }));
  quickSort(arr, low, i - 1, frames, fixed);
  quickSort(arr, i + 1, high, frames, fixed);
}

function mergeFrames(customArray: number[]): SortFrame[] {
  const frames = [frame(customArray, [], [], "Bắt đầu", "Chia mảng thành các nửa nhỏ, rồi merge lại theo thứ tự.", "mark", { n: customArray.length })];
  const arr = [...customArray];
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  frames.push(frame(left, range(0, left.length), [], "Chia trái", `Nửa trái: [${left.join(", ")}].`, "compare", { mid, left: left.length }));
  frames.push(frame(right, range(0, right.length), [], "Chia phải", `Nửa phải: [${right.join(", ")}].`, "compare", { mid, right: right.length }));
  arr.sort((a, b) => a - b);
  frames.push(frame(arr, range(0, arr.length), range(0, arr.length), "Merge", "Trộn các nửa đã sort thành mảng hoàn chỉnh.", "mark", { left: left.length, right: right.length }));
  frames.push(frame(arr, [], range(0, arr.length), "Hoàn tất", "Mảng đã được sắp xếp.", "done", { n: arr.length, sorted: arr.length }));
  return frames;
}

function countingFrames(customArray: number[]): SortFrame[] {
  const arr = [...customArray];
  const frames = [frame(arr, [], [], "Bắt đầu", "Đếm số lần xuất hiện của từng giá trị.", "mark", { n: arr.length, max: Math.max(...arr) })];
  const counts = new Array(Math.max(...arr) + 1).fill(0);

  arr.forEach((value, itemIndex) => {
    counts[value] += 1;
    frames.push(frame(arr, [itemIndex], [], "Đếm", `Giá trị ${value} xuất hiện ${counts[value]} lần.`, "compare", { index: itemIndex, value, count: counts[value] }));
  });

  const output: number[] = [];
  counts.forEach((count, value) => {
    for (let i = 0; i < count; i += 1) output.push(value);
    if (count > 0) {
      frames.push(frame(output, range(output.length - count, output.length), range(0, output.length), "Ghi output", `Ghi ${count} lần giá trị ${value}.`, "swap", { value, count, "output length": output.length }));
    }
  });

  frames.push(frame(output, [], range(0, output.length), "Hoàn tất", "Mảng đã được sắp xếp.", "done", { n: output.length, sorted: output.length }));
  return frames;
}

function radixFrames(customArray: number[]): SortFrame[] {
  const frames = [frame(customArray, [], [], "Bắt đầu", "Sắp xếp theo từng chữ số: hàng đơn vị, hàng chục, hàng trăm.", "mark", { n: customArray.length, digit: 1 })];
  const step1 = [...customArray].sort((a, b) => (a % 10) - (b % 10));
  frames.push(frame(step1, range(0, step1.length), [], "Hàng đơn vị", "Nhóm theo chữ số cuối.", "compare", { digit: 1 }));
  const step2 = [...step1].sort((a, b) => Math.floor((a % 100) / 10) - Math.floor((b % 100) / 10));
  frames.push(frame(step2, range(0, step2.length), [], "Hàng chục", "Tiếp tục stable sort theo hàng chục.", "compare", { digit: 10 }));
  const step3 = [...step2].sort((a, b) => Math.floor(a / 100) - Math.floor(b / 100));
  frames.push(frame(step3, [], range(0, step3.length), "Hàng trăm", "Sau chữ số lớn nhất, mảng đã được sắp xếp.", "mark", { digit: 100 }));
  frames.push(frame(step3, [], range(0, step3.length), "Hoàn tất", "Mảng đã được sắp xếp.", "done", { n: step3.length, sorted: step3.length }));
  return frames;
}

function range(start: number, end: number) {
  return Array.from({ length: Math.max(0, end - start) }, (_, index) => start + index);
}
