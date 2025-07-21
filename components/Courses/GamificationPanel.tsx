"use client";
import { Trophy, Target, TrendingUp, Award, Star, BookOpen, Clock, CheckCircle } from "lucide-react";

interface GamificationPanelProps {
  userStats: {
    totalCourses: number;
    completedCourses: number;
    currentStreak: number;
    totalPoints: number;
    level: number;
    nextLevelPoints: number;
    achievements: Array<{
      id: string;
      title: string;
      description: string;
      icon: string;
      unlocked: boolean;
      progress?: number;
    }>;
    weeklyGoal: {
      target: number;
      current: number;
      type: "courses" | "hours" | "lessons";
    };
  };
}

export default function GamificationPanel({ userStats }: GamificationPanelProps) {
  const progressToNextLevel = ((userStats.totalPoints % 100) / 100) * 100;
  const weeklyProgress = (userStats.weeklyGoal.current / userStats.weeklyGoal.target) * 100;

  const getLevelColor = (level: number) => {
    if (level >= 10) return "text-purple-600 dark:text-purple-400";
    if (level >= 5) return "text-blue-600 dark:text-blue-400";
    if (level >= 3) return "text-green-600 dark:text-green-400";
    return "text-yellow-600 dark:text-yellow-400";
  };

  const getWeeklyGoalIcon = () => {
    switch (userStats.weeklyGoal.type) {
      case "courses":
        return <BookOpen size={16} />;
      case "hours":
        return <Clock size={16} />;
      case "lessons":
        return <CheckCircle size={16} />;
      default:
        return <Target size={16} />;
    }
  };

  const getWeeklyGoalLabel = () => {
    switch (userStats.weeklyGoal.type) {
      case "courses":
        return "cours";
      case "hours":
        return "heures";
      case "lessons":
        return "leçons";
      default:
        return "objectifs";
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-800 p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <Trophy size={24} className="text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
            Mon Progrès
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Suivez vos objectifs et débloquez des récompenses
          </p>
        </div>
      </div>

      {/* Niveau et points */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Niveau</span>
            <span className={`text-lg font-bold ${getLevelColor(userStats.level)}`}>
              {userStats.level}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressToNextLevel}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {userStats.totalPoints % 100} / 100 points pour le niveau {userStats.level + 1}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Points totaux</span>
            <span className="text-lg font-bold text-green-600 dark:text-green-400">
              {userStats.totalPoints}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp size={16} className="text-green-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              +15 cette semaine
            </span>
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {userStats.completedCourses}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Cours terminés
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {userStats.currentStreak}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Jours consécutifs
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {userStats.achievements.filter(a => a.unlocked).length}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Badges débloqués
          </div>
        </div>
      </div>

      {/* Objectif hebdomadaire */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 mb-6">
        <div className="flex items-center gap-2 mb-3">
          {getWeeklyGoalIcon()}
          <span className="font-medium text-gray-700 dark:text-gray-200">
            Objectif hebdomadaire
          </span>
        </div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {userStats.weeklyGoal.current} / {userStats.weeklyGoal.target} {getWeeklyGoalLabel()}
          </span>
          <span className="text-sm font-medium text-green-600 dark:text-green-400">
            {Math.round(weeklyProgress)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(weeklyProgress, 100)}%` }}
          />
        </div>
      </div>

      {/* Badges récents */}
      <div>
        <h4 className="font-medium text-gray-700 dark:text-gray-200 mb-3 flex items-center gap-2">
          <Award size={16} />
          Badges récents
        </h4>
        <div className="grid grid-cols-2 gap-3">
          {userStats.achievements.slice(0, 4).map((achievement) => (
            <div
              key={achievement.id}
              className={`p-3 rounded-lg border transition-all ${
                achievement.unlocked
                  ? "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800"
                  : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              }`}
            >
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  achievement.unlocked
                    ? "bg-yellow-100 dark:bg-yellow-900"
                    : "bg-gray-100 dark:bg-gray-700"
                }`}>
                  <Star 
                    size={16} 
                    className={achievement.unlocked ? "text-yellow-600 dark:text-yellow-400" : "text-gray-400"} 
                    fill={achievement.unlocked ? "currentColor" : "none"}
                  />
                </div>
                <div className="flex-1">
                  <div className={`text-sm font-medium ${
                    achievement.unlocked 
                      ? "text-yellow-800 dark:text-yellow-200" 
                      : "text-gray-500 dark:text-gray-400"
                  }`}>
                    {achievement.title}
                  </div>
                  {achievement.progress !== undefined && !achievement.unlocked && (
                    <div className="text-xs text-gray-400">
                      {achievement.progress}% complété
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 