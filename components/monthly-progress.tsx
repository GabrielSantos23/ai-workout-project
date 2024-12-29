interface MonthlyProgressProps {
  progress: number;
}

export function MonthlyProgress({ progress }: MonthlyProgressProps) {
  return (
    <div className="relative flex items-center justify-center">
      <svg className="w-32 h-32">
        <circle
          className="text-muted stroke-current"
          strokeWidth="8"
          stroke="currentColor"
          fill="transparent"
          r="56"
          cx="64"
          cy="64"
        />
        <circle
          className="text-primary stroke-current"
          strokeWidth="8"
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="56"
          cx="64"
          cy="64"
          style={{
            strokeDasharray: `${2 * Math.PI * 56}`,
            strokeDashoffset: `${2 * Math.PI * 56 * (1 - progress / 100)}`,
            transform: "rotate(-90deg)",
            transformOrigin: "center",
          }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-3xl font-bold">{progress}%</span>
        <span className="text-sm text-muted-foreground">You have achieved</span>
      </div>
    </div>
  );
}
