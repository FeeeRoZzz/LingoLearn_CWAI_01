import { useState } from "react";
import { HeroSection } from "@/components/hero-section";
import { LanguageExercise } from "@/components/language-exercise";
import { LessonComplete } from "@/components/lesson-complete";

type AppState = "home" | "exercise" | "complete";

interface UserStats {
  streak: number;
  xp: number;
  lessons: number;
}

// Sample questions for the exercise
const sampleQuestions = [
  {
    id: 1,
    question: "Hola",
    options: ["Goodbye", "Hello", "Please", "Thank you"],
    correct: 1,
    translation: "Hello (Spanish greeting)"
  },
  {
    id: 2,
    question: "Gracias",
    options: ["Hello", "Goodbye", "Thank you", "Please"],
    correct: 2,
    translation: "Thank you (expressing gratitude)"
  },
  {
    id: 3,
    question: "Agua",
    options: ["Fire", "Water", "Earth", "Air"],
    correct: 1,
    translation: "Water (essential liquid)"
  },
  {
    id: 4,
    question: "Casa",
    options: ["Car", "House", "Tree", "Book"],
    correct: 1,
    translation: "House (a place to live)"
  },
  {
    id: 5,
    question: "Adiós",
    options: ["Hello", "Goodbye", "Maybe", "Always"],
    correct: 1,
    translation: "Goodbye (farewell greeting)"
  }
];

const Index = () => {
  const [appState, setAppState] = useState<AppState>("home");
  const [userStats, setUserStats] = useState<UserStats>({
    streak: 7,
    xp: 1250,
    lessons: 23
  });
  const [lastScore, setLastScore] = useState(0);

  const handleStartLearning = () => {
    setAppState("exercise");
  };

  const handleExerciseComplete = (score: number) => {
    setLastScore(score);
    setUserStats(prev => ({
      ...prev,
      xp: prev.xp + score,
      lessons: prev.lessons + 1,
      streak: prev.streak + (score > 0 ? 1 : 0)
    }));
    setAppState("complete");
  };

  const handleContinue = () => {
    setAppState("home");
  };

  const handleRestart = () => {
    setAppState("exercise");
  };

  if (appState === "exercise") {
    return (
      <LanguageExercise
        questions={sampleQuestions}
        onComplete={handleExerciseComplete}
      />
    );
  }

  if (appState === "complete") {
    return (
      <LessonComplete
        score={lastScore}
        maxScore={sampleQuestions.length * 10}
        streak={userStats.streak}
        totalXP={userStats.xp}
        onContinue={handleContinue}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <HeroSection
      onStartLearning={handleStartLearning}
      userStats={userStats}
    />
  );
};

export default Index;
