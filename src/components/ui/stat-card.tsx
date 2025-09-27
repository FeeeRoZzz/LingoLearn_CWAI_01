import { cn } from "@/lib/utils";
import { Card } from "./card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  variant?: "default" | "success" | "warning";
  className?: string;
}

export const StatCard = ({ title, value, icon, variant = "default", className }: StatCardProps) => {
  const variantStyles = {
    default: "border-border",
    success: "border-success bg-gradient-to-br from-success/5 to-success/10",
    warning: "border-warning bg-gradient-to-br from-warning/5 to-warning/10",
  };

  return (
    <Card className={cn(
      "p-4 text-center transition-all duration-200 hover:shadow-card",
      variantStyles[variant],
      className
    )}>
      {icon && (
        <div className="flex justify-center mb-2 text-2xl">
          {icon}
        </div>
      )}
      <div className="text-2xl font-bold text-foreground">{value}</div>
      <div className="text-sm text-muted-foreground">{title}</div>
    </Card>
  );
};