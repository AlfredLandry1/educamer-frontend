import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode, useEffect, useState } from "react";

const COLOR_MAP = {
  success: "bg-green-100 text-green-800 border-green-200",
  warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
  error: "bg-red-100 text-red-800 border-red-200",
  info: "bg-blue-100 text-blue-800 border-blue-200",
  neutral: "bg-gray-100 text-gray-800 border-gray-200",
};

export default function KpiCard({
  label,
  value,
  icon,
  color = "info",
  variation,
  variationLabel,
}: {
  label: string;
  value: string | number;
  icon: ReactNode;
  color?: keyof typeof COLOR_MAP;
  variation?: string;
  variationLabel?: string;
}) {
  // Animation d'apparition (fade/slide)
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <Card
      className={cn(
        "flex flex-row items-center gap-4 px-6 py-5 border-2 shadow-sm transition-all duration-500",
        COLOR_MAP[color],
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}
      style={{ minWidth: 200 }}
    >
      <div className="flex items-center justify-center rounded-full bg-white/80 p-2 shadow text-2xl">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-2xl font-bold leading-tight truncate">{value}</div>
        <div className="text-sm font-medium truncate">{label}</div>
      </div>
      {variation && (
        <div
          className={cn(
            "ml-2 text-xs font-semibold px-2 py-1 rounded-full",
            variation.startsWith("+")
              ? "bg-green-200 text-green-900"
              : variation.startsWith("-")
              ? "bg-red-200 text-red-900"
              : "bg-gray-200 text-gray-700"
          )}
          title={variationLabel}
        >
          {variation}
        </div>
      )}
    </Card>
  );
} 