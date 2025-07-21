import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Bell, CheckCircle, Star, AlertCircle } from "lucide-react";

export interface Notification {
  id: string;
  type: "success" | "info" | "warning" | "achievement";
  message: string;
  date: string;
  read: boolean;
  priority?: "high" | "medium" | "low";
}

const TYPE_MAP = {
  success: {
    color: "bg-green-100 text-green-800 border-green-200",
    icon: <CheckCircle size={18} />,
  },
  info: {
    color: "bg-blue-100 text-blue-800 border-blue-200",
    icon: <Bell size={18} />,
  },
  warning: {
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    icon: <AlertCircle size={18} />,
  },
  achievement: {
    color: "bg-purple-100 text-purple-800 border-purple-200",
    icon: <Star size={18} />,
  },
};

export default function NotificationList({ notifications }: { notifications: Notification[] }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => setVisible(true), 200);
  }, []);
  return (
    <div className={cn(
      "bg-white dark:bg-gray-950 rounded-xl border p-4 shadow w-full transition-all duration-500",
      visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
    )}>
      <div className="font-bold text-lg mb-2 flex items-center gap-2 text-primary-700 dark:text-primary-200">
        <Bell size={20} /> Notifications
      </div>
      <ul className="divide-y divide-gray-200 dark:divide-gray-800">
        {notifications.map((n) => {
          const type = TYPE_MAP[n.type];
          return (
            <li key={n.id} className={cn("flex items-center gap-3 py-2", type.color, "rounded")}> 
              <span>{type.icon}</span>
              <span className="flex-1 truncate font-medium">{n.message}</span>
              <span className="ml-2 text-xs text-gray-500">{n.date}</span>
              {!n.read && <span className="ml-2 text-xs font-bold text-primary-600 animate-pulse">Nouveau</span>}
            </li>
          );
        })}
      </ul>
    </div>
  );
} 