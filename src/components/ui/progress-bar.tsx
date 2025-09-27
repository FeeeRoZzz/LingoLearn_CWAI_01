import { cn } from "@/lib/utils";

interface ProgressBarProps {
  progress: number;
  className?: string;
  showLabel?: boolean;
}

export const ProgressBar = ({ progress, className, showLabel = false }: ProgressBarProps) => {
  return (
    <div className={cn("w-full", className)}>
      <div className="bg-secondary rounded-full h-3 overflow-hidden">
        <div 
          className="h-full bg-gradient-primary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
      {showLabel && (
        <div className="text-sm text-muted-foreground mt-1 text-center">
          {Math.round(progress)}% Complete
        </div>
      )}
    </div>
  );
};