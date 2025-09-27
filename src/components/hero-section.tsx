import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { Globe, Users, Trophy, BookOpen } from "lucide-react";
import owlMascot from "@/assets/owl-mascot.png";

interface HeroSectionProps {
  onStartLearning: () => void;
  userStats?: {
    streak: number;
    xp: number;
    lessons: number;
  };
}

export const HeroSection = ({ onStartLearning, userStats }: HeroSectionProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-primary/5">
      <div className="container mx-auto px-4 py-12">
        {/* Navigation */}
        <nav className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-3">
            <img src={owlMascot} alt="LingoLearn Owl" className="w-10 h-10" />
            <h1 className="text-2xl font-bold text-primary">LingoLearn</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Sign In</Button>
            <Button className="bg-gradient-primary hover:shadow-elegant">Get Started</Button>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-8 animate-fade-in-up">
            <div>
              <h2 className="text-5xl lg:text-6xl font-bold mb-6">
                Learn Languages
                <span className="block bg-gradient-hero bg-clip-text text-transparent">
                  The Fun Way
                </span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Master new languages through gamified lessons, instant feedback, and 
                daily streaks. Join millions learning with our bite-sized, science-based approach.
              </p>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={onStartLearning}
                size="lg"
                className="bg-gradient-primary hover:shadow-elegant px-8 py-4 text-lg font-semibold"
              >
                Start Learning Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg"
              >
                Learn More
              </Button>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                500M+ learners
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                40+ languages
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                #1 Education App
              </div>
            </div>
          </div>

          <div className="relative animate-fade-in-up [animation-delay:200ms]">
            <Card className="p-8 bg-gradient-card border-0 shadow-elegant">
              <div className="text-center mb-8">
                <img 
                  src={owlMascot} 
                  alt="Friendly Owl Mascot" 
                  className="w-32 h-32 mx-auto mb-4 animate-bounce-in [animation-delay:400ms]"
                />
                <h3 className="text-2xl font-bold mb-2">Ready to begin?</h3>
                <p className="text-muted-foreground">Start your language journey today!</p>
              </div>

              {userStats && (
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <StatCard
                    title="Day Streak"
                    value={userStats.streak}
                    icon="🔥"
                    variant="warning"
                  />
                  <StatCard
                    title="Total XP"
                    value={userStats.xp}
                    icon="⭐"
                    variant="success"
                  />
                  <StatCard
                    title="Lessons"
                    value={userStats.lessons}
                    icon="📚"
                    variant="default"
                  />
                </div>
              )}

              <Button
                onClick={onStartLearning}
                className="w-full bg-gradient-primary hover:shadow-elegant py-4 text-lg font-semibold"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Continue Learning
              </Button>
            </Card>
          </div>
        </div>

        {/* Features Preview */}
        <div className="grid md:grid-cols-3 gap-8 animate-fade-in-up [animation-delay:600ms]">
          <Card className="p-6 text-center bg-gradient-card border-0 shadow-card hover:shadow-elegant transition-shadow">
            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Gamified Learning</h3>
            <p className="text-muted-foreground">Earn XP, maintain streaks, and unlock achievements as you progress.</p>
          </Card>

          <Card className="p-6 text-center bg-gradient-card border-0 shadow-card hover:shadow-elegant transition-shadow">
            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Bite-sized Lessons</h3>
            <p className="text-muted-foreground">Quick 5-minute sessions that fit perfectly into your daily routine.</p>
          </Card>

          <Card className="p-6 text-center bg-gradient-card border-0 shadow-card hover:shadow-elegant transition-shadow">
            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Multiple Languages</h3>
            <p className="text-muted-foreground">Choose from dozens of languages and start speaking from day one.</p>
          </Card>
        </div>
      </div>
    </div>
  );
};