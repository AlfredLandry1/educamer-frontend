"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import { Medal } from "lucide-react";

const LEVELS = [
  { min: 0, max: 49, label: "Bronze", color: "#cd7f32" },
  { min: 50, max: 79, label: "Argent", color: "#c0c0c0" },
  { min: 80, max: 100, label: "Or", color: "#ffd700" },
];

function getLevel(progress: number) {
  return LEVELS.find(l => progress >= l.min && progress <= l.max) || LEVELS[0];
}

export default function ProgressChart({ data, progress }: { data: { name: string; value: number }[]; progress: number }) {
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    setTimeout(() => setAnimate(true), 200);
  }, []);
  const level = getLevel(progress);

  return (
    <div className="w-full bg-white dark:bg-gray-950 rounded-xl border p-6 shadow flex flex-col md:flex-row items-center gap-6">
      <div className="flex flex-col items-center justify-center min-w-[120px]">
        <div className="relative flex items-center justify-center mb-2">
          <Medal size={40} style={{ color: level.color }} className="drop-shadow" />
          <span className="absolute text-xs font-bold text-gray-900 dark:text-white" style={{ top: 36 }}>{level.label}</span>
        </div>
        <div className="text-lg font-semibold text-gray-700 dark:text-gray-200">Niveau</div>
        <div className="text-2xl font-bold text-primary-700 dark:text-primary-200">{progress}%</div>
      </div>
      <div className="flex-1 min-w-0">
        <ResponsiveContainer width="100%" height={120}>
          <BarChart data={data} className="">
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
            <YAxis hide domain={[0, 100]} />
            <Tooltip cursor={{ fill: "#e0e7ef" }} />
            <Bar
              dataKey="value"
              fill={level.color}
              radius={[8, 8, 0, 0]}
              isAnimationActive={animate}
              animationDuration={800}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
} 