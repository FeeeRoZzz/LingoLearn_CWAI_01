import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/ui/stat-card";
import { ProgressBar } from "@/components/ui/progress-bar"; 
import { Trophy, Star, Flame, RotateCcw } from "lucide-react";
import owlMascot from "@/assets/owl-mascot.png";

interface LessonCompleteProps {
  score: number;
  maxScore: number;
  streak: number;
  totalXP: number;
  onContinue: () => void;
  onRestart: () => void;
}

export const LessonComplete = ({ 
  score, 
  maxScore, 
  streak, 
  totalXP, 
  onContinue, 
  onRestart 
}: LessonCompleteProps) => {
  const percentage = (score / maxScore) * 100;
  const isExcellent = percentage >= 80;
  const isGood = percentage >= 60;

  let message = "Keep practicing! 💪";
  let owlMessage = "Don't give up! Every mistake is a step forward.";
  
  if (isExcellent) {
    message = "Excellent work! 🎉";
    owlMessage = "Fantastic! You're really getting the hang of this!";
  } else if (isGood) {
    message = "Good job! 👏";
    owlMessage = "Nice work! You're making steady progress.";
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-primary/5 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-8 bg-gradient-card border-0 shadow-elegant animate-bounce-in">
        <div className="text-center space-y-8">
          {/* Mascot and Title */}
          <div>
            <img 
              src={owlMascot} 
              alt="Congratulations!" 
              className="w-24 h-24 mx-auto mb-4 animate-bounce-in [animation-delay:200ms]" 
            />
            <h1 className="text-4xl font-bold mb-2 bg-gradient-hero bg-clip-text text-transparent">
              Lesson Complete!
            </h1>
            <p className="text-xl text-muted-foreground">{message}</p>
          </div>

          {/* Score Display */}
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-6xl font-bold text-primary mb-2">{score}</div>
              <div className="text-lg text-muted-foreground">out of {maxScore} XP</div>
            </div>
            
            <ProgressBar 
              progress={percentage} 
              className="max-w-md mx-auto" 
              showLabel 
            />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto animate-fade-in-up [animation-delay:400ms]">
            <StatCard
              title="Accuracy"
              value={`${Math.round(percentage)}%`}
              variant={isExcellent ? "success" : isGood ? "warning" : "default"}
            />
            <StatCard
              title="Streak"
              value={streak}
              icon={<Flame className="w-5 h-5 text-accent" />}
              variant="warning"
            />
            <StatCard
              title="Total XP"
              value={totalXP}
              icon={<Star className="w-5 h-5 text-success" />}
              variant="success"
            />
          </div>

          {/* Motivational Message */}
          <Card className="p-6 bg-primary/5 border-primary/20 max-w-md mx-auto animate-fade-in-up [animation-delay:600ms]">
            <div className="flex items-start gap-3">
              <img src={owlMascot} alt="Owl" className="w-8 h-8 flex-shrink-0" />
              <p className="text-sm italic text-muted-foreground">
                "{owlMessage}"
              </p>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center animate-fade-in-up [animation-delay:800ms]">
            <Button
              variant="outline"
              onClick={onRestart}
              className="px-6 py-3"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            <Button
              onClick={onContinue}
              className="bg-gradient-primary hover:shadow-elegant px-8 py-3 font-semibold"
            >
              <Trophy className="w-4 h-4 mr-2" />
              Continue Learning
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};