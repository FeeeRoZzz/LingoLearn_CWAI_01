import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { toast } from "@/hooks/use-toast";
import { CheckCircle2, XCircle, Trophy, Flame } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  translation: string;
}

interface LanguageExerciseProps {
  questions: Question[];
  onComplete: (score: number) => void;
}

export const LanguageExercise = ({ questions, onComplete }: LanguageExerciseProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);

  const handleAnswerSelect = (optionIndex: number) => {
    if (answered) return;
    
    setSelectedAnswer(optionIndex);
    setAnswered(true);
    setShowResult(true);

    const isCorrect = optionIndex === questions[currentQuestion].correct;
    
    if (isCorrect) {
      setScore(prev => prev + 10);
      toast({
        title: "Correct! 🎉",
        description: `+10 XP earned`,
        className: "border-success bg-success/10",
      });
    } else {
      toast({
        title: "Not quite right 🤔",
        description: `Correct answer: ${questions[currentQuestion].options[questions[currentQuestion].correct]}`,
        variant: "destructive",
      });
    }
  };

  const handleContinue = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setAnswered(false);
    } else {
      onComplete(score);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-accent" />
          <span className="font-bold text-lg">{score} XP</span>
        </div>
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-warning" />
          <span className="text-sm text-muted-foreground">
            {currentQuestion + 1} / {questions.length}
          </span>
        </div>
      </div>

      <ProgressBar progress={progress} className="mb-8" />

      <Card className="p-8 bg-gradient-card border-0 shadow-card">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Translate this phrase</h2>
          <p className="text-3xl font-bold text-primary mb-4">
            "{question.question}"
          </p>
          <p className="text-sm text-muted-foreground">
            Translation: {question.translation}
          </p>
        </div>

        <div className="grid gap-3">
          {question.options.map((option, index) => {
            let buttonVariant: "outline" | "default" | "destructive" = "outline";
            let className = "h-14 text-lg justify-start hover:shadow-card transition-all duration-200";
            
            if (showResult && selectedAnswer === index) {
              if (index === question.correct) {
                buttonVariant = "default";
                className += " bg-success text-success-foreground animate-pulse-success";
              } else {
                buttonVariant = "destructive";
                className += " animate-shake";
              }
            } else if (showResult && index === question.correct) {
              buttonVariant = "default";
              className += " bg-success text-success-foreground";
            }

            return (
              <Button
                key={index}
                variant={buttonVariant}
                className={className}
                onClick={() => handleAnswerSelect(index)}
                disabled={answered}
              >
                <div className="flex items-center gap-3 w-full">
                  {showResult && index === question.correct && (
                    <CheckCircle2 className="w-5 h-5" />
                  )}
                  {showResult && selectedAnswer === index && index !== question.correct && (
                    <XCircle className="w-5 h-5" />
                  )}
                  <span className="flex-1">{option}</span>
                </div>
              </Button>
            );
          })}
        </div>

        {showResult && (
          <div className="mt-6 text-center">
            <Button
              onClick={handleContinue}
              className="bg-gradient-primary hover:shadow-elegant px-8 py-3 text-lg font-semibold animate-bounce-in"
            >
              {currentQuestion < questions.length - 1 ? "Continue" : "Complete Lesson"}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};