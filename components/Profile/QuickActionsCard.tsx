"use client";
import { Globe, HelpCircle } from "lucide-react";

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  variant?: "default" | "danger" | "primary";
  disabled?: boolean;
}

interface QuickActionsCardProps {
  actions: QuickAction[];
  title?: string;
}

export default function QuickActionsCard({ actions, title = "Actions rapides" }: QuickActionsCardProps) {
  const getButtonStyles = (variant: string = "default", disabled: boolean = false) => {
    const baseStyles = "w-full text-left p-3 rounded-lg border transition-colors";
    
    if (disabled) {
      return `${baseStyles} border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-400 cursor-not-allowed`;
    }
    
    switch (variant) {
      case "danger":
        return `${baseStyles} border-red-200 dark:border-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-700 dark:text-red-200`;
      case "primary":
        return `${baseStyles} border-blue-200 dark:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-700 dark:text-blue-200`;
      default:
        return `${baseStyles} border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-200`;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-950 rounded-xl border p-6 shadow">
      <div className="font-bold text-primary-700 dark:text-primary-200 mb-4 flex items-center gap-2">
        <Globe size={18} /> {title}
      </div>
      
      <div className="space-y-2">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={action.onClick}
            disabled={action.disabled}
            className={getButtonStyles(action.variant, action.disabled)}
          >
            <div className="flex items-center gap-3">
              {action.icon}
              <span className="text-sm font-medium">
                {action.label}
              </span>
            </div>
          </button>
        ))}
      </div>
      
      {/* Help text */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <HelpCircle size={12} />
          <span>Cliquez sur une action pour l&apos;exécuter</span>
        </div>
      </div>
    </div>
  );
} 