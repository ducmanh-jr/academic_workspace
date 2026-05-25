"use client";

import React, { useState } from "react";
import styles from "./QuizSection.module.css";

interface QuizItem {
  question: string;
  options: string[];
  correct: string;
  explanation: string;
}

interface QuizSectionProps {
  quiz: QuizItem;
}

export function QuizSection({ quiz }: QuizSectionProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  if (!quiz) return null;

  const handleOptionClick = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);
  };

  const handleReset = () => {
    setSelectedOption(null);
    setIsAnswered(false);
  };

  return (
    <div className={styles.quizBox}>
      <p className={styles.kicker}>Quiz nhanh</p>
      <h3 className={styles.question}>{quiz.question}</h3>
      
      <div className={styles.optionGrid}>
        {quiz.options.map((option) => {
          const isSelected = selectedOption === option;
          const isCorrectOption = option === quiz.correct;
          
          let buttonClass = styles.optionButton;
          if (isAnswered) {
            if (isCorrectOption) {
              buttonClass += ` ${styles.correct}`;
            } else if (isSelected) {
              buttonClass += ` ${styles.incorrect}`;
            } else {
              buttonClass += ` ${styles.disabled}`;
            }
          } else {
            buttonClass += ` ${styles.interactive}`;
          }

          return (
            <button
              key={option}
              className={buttonClass}
              onClick={() => handleOptionClick(option)}
              disabled={isAnswered}
              type="button"
            >
              <span className={styles.optionText}>{option}</span>
              {isAnswered && isCorrectOption && <span className={styles.feedbackIcon}>✓</span>}
              {isAnswered && isSelected && !isCorrectOption && <span className={styles.feedbackIcon}>✗</span>}
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div className={styles.explanationArea}>
          <div className={styles.feedbackHeader}>
            <span className={selectedOption === quiz.correct ? styles.textSuccess : styles.textDanger}>
              {selectedOption === quiz.correct ? "🎉 Chính xác!" : "😢 Chưa chính xác"}
            </span>
            <button className={styles.resetButton} onClick={handleReset} type="button">
              Làm lại
            </button>
          </div>
          <p className={styles.explanationText}>
            <strong>Đáp án đúng: {quiz.correct}</strong> — {quiz.explanation}
          </p>
        </div>
      )}
    </div>
  );
}
