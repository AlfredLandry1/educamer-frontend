import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { ClipboardList, CheckCircle, AlertTriangle, Clock } from "lucide-react";

export interface Assignment {
  id: string;
  title: string;
  dueDate: string;
  status: "pending" | "submitted" | "late";
  grade?: number;
}

const STATUS_MAP = {
  pending: {
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    icon: <Clock size={18} />,
    label: "À rendre",
  },
  submitted: {
    color: "bg-green-100 text-green-800 border-green-200",
    icon: <CheckCircle size={18} />,
    label: "Rendu",
  },
  late: {
    color: "bg-red-100 text-red-800 border-red-200",
    icon: <AlertTriangle size={18} />,
    label: "En retard",
  },
};

export default function AssignmentList({ assignments }: { assignments: Assignment[] }) {
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
        <ClipboardList size={20} /> Devoirs à rendre
      </div>
      <ul className="divide-y divide-gray-200 dark:divide-gray-800">
        {assignments.map((a) => {
          const status = STATUS_MAP[a.status];
          return (
            <li key={a.id} className={cn("flex items-center gap-3 py-2", status.color, "rounded")}> 
              <span>{status.icon}</span>
              <span className="flex-1 truncate font-medium">{a.title}</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/80 border border-gray-200 text-gray-700 dark:bg-gray-900 dark:text-gray-200 ml-2">
                {status.label}
              </span>
              <span className="ml-2 text-xs text-gray-500">{a.dueDate}</span>
              {a.grade !== undefined && (
                <span className="ml-2 text-xs font-bold text-green-700">{a.grade}/20</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
} 