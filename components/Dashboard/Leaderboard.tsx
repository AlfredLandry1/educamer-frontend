import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export interface LeaderboardUser {
  rank: number;
  name: string;
  avatarUrl?: string;
  score: number;
  badge?: string;
  isCurrent?: boolean;
}

export default function Leaderboard({ data }: { data: LeaderboardUser[] }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => setVisible(true), 200);
  }, []);
  return (
    <div className={cn(
      "bg-white dark:bg-gray-950 rounded-xl border p-4 shadow w-full transition-all duration-500",
      visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
    )}>
      <div className="font-bold text-lg mb-2 text-primary-700 dark:text-primary-200">Classement de la classe</div>
      <ul className="divide-y divide-gray-200 dark:divide-gray-800">
        {data.slice(0, 5).map((user) => (
          <li
            key={user.rank}
            className={cn(
              "flex items-center gap-3 py-2",
              user.isCurrent && "bg-primary-50 dark:bg-primary-900 rounded"
            )}
          >
            <span className={cn("w-6 text-center font-bold", user.rank === 1 && "text-yellow-500", user.rank === 2 && "text-gray-400", user.rank === 3 && "text-orange-700")}>{user.rank}</span>
            <Avatar className="size-8">
              {user.avatarUrl ? (
                <AvatarImage src={user.avatarUrl} alt={user.name} />
              ) : (
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              )}
            </Avatar>
            <span className={cn("flex-1 truncate font-medium", user.isCurrent && "text-primary-700 dark:text-primary-200")}>{user.name}</span>
            <span className="font-mono text-sm text-gray-700 dark:text-gray-200">{user.score} pts</span>
            {user.badge && (
              <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 font-semibold">{user.badge}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
} 