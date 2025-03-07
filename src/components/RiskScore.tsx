
import { cn } from "@/lib/utils";

interface RiskScoreProps {
  score: number;
}

export const RiskScore = ({ score }: RiskScoreProps) => {
  const getRiskLevel = (score: number) => {
    if (score >= 0.8) return { level: "Extreme", color: "bg-destructive dark:bg-red-500" };
    if (score >= 0.6) return { level: "High", color: "bg-orange-500" };
    if (score >= 0.4) return { level: "Moderate", color: "bg-yellow-500" };
    return { level: "Low", color: "bg-green-500" };
  };

  const { level, color } = getRiskLevel(score);

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-primary-dark dark:text-cyan-400">Risk Assessment</h3>
      <div className="relative h-3 bg-secondary dark:bg-[#0f1117]/80 rounded-full overflow-hidden shadow-inner">
        <div
          className={cn(
            "absolute h-full transition-all duration-500 shadow-lg",
            color
          )}
          style={{ width: `${score * 100}%` }}
        />
      </div>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-medium text-primary-dark dark:text-gray-300/90">Risk Level: {level}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400/80">
            Score: {(score * 100).toFixed(1)}%
          </p>
        </div>
        <div
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium shadow-lg",
            color,
            "text-white"
          )}
        >
          {level}
        </div>
      </div>
    </div>
  );
};
