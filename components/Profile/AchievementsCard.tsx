"use client";
import { CheckCircle, Trophy, Star, Award } from "lucide-react";

interface Achievement {
  type: "gold" | "silver" | "bronze" | "star" | "trophy" | "award";
  label: string;
  description: string;
  date: string;
  icon?: React.ReactNode;
}

interface AchievementsCardProps {
  achievements: Achievement[];
  title?: string;
}

export default function AchievementsCard({ achievements, title = "Mes réalisations" }: AchievementsCardProps) {
  const getAchievementIcon = (type: string) => {
    switch (type) {
      case "gold":
        return <Trophy size={16} className="text-yellow-600 dark:text-yellow-400" />;
      case "silver":
        return <Award size={16} className="text-gray-500 dark:text-gray-400" />;
      case "bronze":
        return <Award size={16} className="text-orange-600 dark:text-orange-400" />;
      case "star":
        return <Star size={16} className="text-yellow-500 dark:text-yellow-400" />;
      case "trophy":
        return <Trophy size={16} className="text-blue-600 dark:text-blue-400" />;
      default:
        return <CheckCircle size={16} className="text-green-600 dark:text-green-400" />;
    }
  };

  const getAchievementBgColor = (type: string) => {
    switch (type) {
      case "gold":
        return "bg-yellow-100 dark:bg-yellow-900";
      case "silver":
        return "bg-gray-100 dark:bg-gray-900";
      case "bronze":
        return "bg-orange-100 dark:bg-orange-900";
      case "star":
        return "bg-yellow-100 dark:bg-yellow-900";
      case "trophy":
        return "bg-blue-100 dark:bg-blue-900";
      default:
        return "bg-green-100 dark:bg-green-900";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-950 rounded-xl border p-6 shadow">
      <div className="font-bold text-primary-700 dark:text-primary-200 mb-4 flex items-center gap-2">
        <CheckCircle size={18} /> {title}
      </div>
      
      {achievements.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <Trophy size={24} className="text-gray-400" />
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Aucune réalisation pour le moment
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
            Continuez à apprendre pour débloquer des badges !
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {achievements.map((achievement, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <div className={`w-8 h-8 rounded-full ${getAchievementBgColor(achievement.type)} flex items-center justify-center`}>
                {achievement.icon || getAchievementIcon(achievement.type)}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm text-gray-700 dark:text-gray-200">
                  {achievement.label}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {achievement.description}
                </div>
              </div>
              <div className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                {achievement.date}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Progress indicator */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">
            Progression globale
          </span>
          <span className="font-semibold text-primary-600 dark:text-primary-400">
            {achievements.length} / 10 badges
          </span>
        </div>
        <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min((achievements.length / 10) * 100, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
} 