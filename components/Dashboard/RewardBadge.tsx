import { cn } from "@/lib/utils";
import { Medal, Star, Award } from "lucide-react";
import { useEffect, useState } from "react";

const BADGE_MAP = {
  bronze: { color: "#cd7f32", icon: Medal },
  argent: { color: "#c0c0c0", icon: Medal },
  or: { color: "#ffd700", icon: Medal },
  star: { color: "#fbbf24", icon: Star },
  award: { color: "#6366f1", icon: Award },
};

export default function RewardBadge({
  type = "bronze",
  label,
  description,
}: {
  type?: keyof typeof BADGE_MAP;
  label: string;
  description?: string;
}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);
  const badge = BADGE_MAP[type] || BADGE_MAP.bronze;
  const Icon = badge.icon;
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-3 rounded-xl border shadow bg-white dark:bg-gray-950 transition-all duration-500",
        visible ? "scale-100 opacity-100" : "scale-90 opacity-0"
      )}
      style={{ minWidth: 90 }}
    >
      <div className="relative flex items-center justify-center mb-1">
        <Icon size={36} style={{ color: badge.color }} className="drop-shadow animate-bounce" />
      </div>
      <div className="text-xs font-bold text-gray-900 dark:text-white mb-0.5">{label}</div>
      {description && <div className="text-xs text-gray-500 text-center">{description}</div>}
    </div>
  );
} 