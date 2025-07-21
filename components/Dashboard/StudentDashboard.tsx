import KpiCard from "./KpiCard";
import ProgressChart from "./ProgressChart";
import RewardBadge from "./RewardBadge";
import NotificationList, { Notification } from "./NotificationList";
import DashboardBreadcrumbs from "./DashboardBreadcrumbs";
import {
  ClipboardList,
  BarChart2,
  Award,
  User,
  MessageCircle,
  TrendingUp,
  Calendar,
  Target,
  FileText,
  Filter,
  Zap,
  TrendingDown,
  BookOpen,
  Trophy,
  Lightbulb,
} from "lucide-react";

// Mock data élève optimisée
const user = {
  name: "Marie Dupont",
  grade: "6ème A",
  lastLogin: "Aujourd'hui à 09:15",
  experience: "2 ans",
  achievements: [
    {
      type: "gold",
      label: "Or",
      description: "Niveau 3 atteint",
      date: "Ce mois",
    },
    {
      type: "star",
      label: "Série",
      description: "5 devoirs rendus d'affilée",
      date: "Semaine dernière",
    },
  ],
};

const kpis = [
  {
    label: "Progression générale",
    value: "78%",
    icon: <BarChart2 size={28} />,
    color: "success" as const,
    trend: "+5% ce mois",
  },
  {
    label: "Devoirs à rendre",
    value: "3",
    icon: <ClipboardList size={28} />,
    color: "warning" as const,
    trend: "2 nouveaux cette semaine",
  },
  {
    label: "Moyenne générale",
    value: "15.2/20",
    icon: <Target size={28} />,
    color: "success" as const,
    trend: "+0.8 vs trimestre dernier",
  },
  {
    label: "Badges obtenus",
    value: "8",
    icon: <Award size={28} />,
    color: "info" as const,
    trend: "+2 ce mois",
  },
];

const notifications: Notification[] = [
  {
    id: "1",
    type: "achievement",
    message: "Félicitations ! Vous avez obtenu le badge Or !",
    date: "Aujourd'hui",
    read: false,
    priority: "high",
  },
  {
    id: "2",
    type: "info",
    message: "Nouveau devoir de maths disponible.",
    date: "Hier",
    read: false,
    priority: "medium",
  },
  {
    id: "3",
    type: "warning",
    message: "Devoir de français à rendre dans 2 jours.",
    date: "Il y a 2 jours",
    read: true,
    priority: "high",
  },
  {
    id: "4",
    type: "success",
    message: "Excellent travail sur le dernier contrôle !",
    date: "Il y a 3 jours",
    read: false,
    priority: "low",
  },
];

const assignments = [
  {
    title: "Devoir de maths - Géométrie",
    subject: "Mathématiques",
    dueDate: "15/09",
    status: "pending",
    priority: "high",
  },
  {
    title: "Rédaction française",
    subject: "Français",
    dueDate: "18/09",
    status: "in-progress",
    priority: "medium",
  },
  {
    title: "Projet sciences",
    subject: "Sciences",
    dueDate: "20/09",
    status: "completed",
    priority: "low",
  },
];

const progressData = {
  currentLevel: 3,
  progress: 78,
  nextLevel: 4,
  subjects: [
    { name: "Mathématiques", progress: 85, trend: "up" },
    { name: "Français", progress: 72, trend: "stable" },
    { name: "Sciences", progress: 68, trend: "up" },
    { name: "Histoire", progress: 75, trend: "down" },
  ],
};

const leaderboardData = [
  { rank: 1, name: "Thomas Leroy", score: 95, badge: "gold" },
  {
    rank: 2,
    name: "Marie Dupont",
    score: 92,
    badge: "gold",
    isCurrentUser: true,
  },
  { rank: 3, name: "Emma Bernard", score: 88, badge: "silver" },
  { rank: 4, name: "Lucas Martin", score: 85, badge: "silver" },
  { rank: 5, name: "Alice Dupont", score: 82, badge: "bronze" },
];

const weeklySchedule = [
  {
    day: "Lundi",
    subject: "Mathématiques",
    time: "08h-10h",
    room: "Salle 12",
    type: "course",
  },
  {
    day: "Lundi",
    subject: "Français",
    time: "10h-12h",
    room: "Salle 15",
    type: "course",
  },
  {
    day: "Mardi",
    subject: "Sciences",
    time: "14h-16h",
    room: "Labo 3",
    type: "practical",
  },
  {
    day: "Mercredi",
    subject: "Contrôle maths",
    time: "08h-10h",
    room: "Salle 12",
    type: "exam",
  },
];

const quickActions = [
  {
    title: "Voir mes devoirs",
    icon: <FileText size={20} />,
    color: "blue",
    action: "view-assignments",
  },
  {
    title: "Réviser",
    icon: <BookOpen size={20} />,
    color: "green",
    action: "study",
  },
  {
    title: "Demander de l'aide",
    icon: <MessageCircle size={20} />,
    color: "purple",
    action: "ask-help",
  },
  {
    title: "Voir mes notes",
    icon: <Target size={20} />,
    color: "orange",
    action: "view-grades",
  },
];

export default function StudentDashboard() {
  return (
    <section className="w-full animate-fade-in flex flex-col gap-8">
      {/* Header avec breadcrumbs */}
      <div>
        <DashboardBreadcrumbs />
      </div>
      {/* Message d'accueil personnalisé optimisé */}
      <div className="bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900 dark:to-blue-900 rounded-xl p-6 flex items-center gap-4 shadow-lg">
        <div className="bg-primary-100 dark:bg-primary-800 p-3 rounded-full">
          <User className="text-primary-600 dark:text-primary-400" size={32} />
        </div>
        <div className="flex-1">
          <div className="font-bold text-xl text-primary-800 dark:text-primary-100">
            Bonjour {user.name} 👋
          </div>
          <div className="text-sm text-primary-700 dark:text-primary-200">
            Classe : {user.grade} • Dernière connexion : {user.lastLogin}
          </div>
          <div className="text-xs text-primary-600 dark:text-primary-300 mt-1">
            Niveau {user.experience} • Progression : {progressData.progress}%
          </div>
        </div>
        <div className="flex gap-2">
          {user.achievements.map((achievement, i) => (
            <div
              key={i}
              className="bg-yellow-100 dark:bg-yellow-900 p-2 rounded-full"
            >
              <Trophy
                className="text-yellow-600 dark:text-yellow-400"
                size={20}
              />
            </div>
          ))}
        </div>
      </div>

      {/* KPI cards optimisées */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <div key={i} className="relative">
            <KpiCard {...kpi} />
            {kpi.trend && (
              <div className="absolute -top-2 -right-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs px-2 py-1 rounded-full">
                {kpi.trend}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-950 rounded-xl border p-4 shadow">
        <div className="font-bold text-primary-700 dark:text-primary-200 mb-3 flex items-center gap-2">
          <Zap size={18} />
          Actions rapides
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickActions.map((action, i) => (
            <button
              key={i}
              className={`p-3 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-${action.color}-300 dark:hover:border-${action.color}-600 transition-colors group`}
            >
              <div
                className={`text-${action.color}-600 dark:text-${action.color}-400 mb-2`}
              >
                {action.icon}
              </div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-gray-100">
                {action.title}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Grille principale optimisée */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Colonne gauche */}
        <div className="flex flex-col gap-6">
          {/* Progression par matière */}
          <div className="bg-white dark:bg-gray-950 rounded-xl border p-4 shadow">
            <div className="font-bold text-primary-700 dark:text-primary-200 mb-3 flex items-center gap-2">
              <BarChart2 size={18} />
              Progression par matière
            </div>
            <div className="space-y-3">
              {progressData.subjects.map((subject, i) => (
                <div
                  key={i}
                  className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-sm text-gray-700 dark:text-gray-200">
                      {subject.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-primary-600 dark:text-primary-400">
                        {subject.progress}%
                      </span>
                      {subject.trend === "up" ? (
                        <TrendingUp size={14} className="text-green-600" />
                      ) : subject.trend === "down" ? (
                        <TrendingDown size={14} className="text-red-600" />
                      ) : (
                        <div className="w-3 h-0.5 bg-gray-400"></div>
                      )}
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${subject.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Planning de la semaine */}
          <div className="bg-white dark:bg-gray-950 rounded-xl border p-4 shadow">
            <div className="font-bold text-primary-700 dark:text-primary-200 mb-3 flex items-center gap-2">
              <Calendar size={18} />
              Planning de la semaine
            </div>
            <div className="space-y-2">
              {weeklySchedule.map((schedule, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg border-l-4 ${
                    schedule.type === "exam"
                      ? "bg-red-50 dark:bg-red-900/20 border-red-500"
                      : schedule.type === "practical"
                      ? "bg-green-50 dark:bg-green-900/20 border-green-500"
                      : "bg-blue-50 dark:bg-blue-900/20 border-blue-500"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-sm text-gray-700 dark:text-gray-200">
                        {schedule.day} - {schedule.time}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {schedule.subject}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {schedule.room}
                      </div>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        schedule.type === "exam"
                          ? "bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200"
                          : schedule.type === "practical"
                          ? "bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200"
                          : "bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200"
                      }`}
                    >
                      {schedule.type === "exam"
                        ? "Contrôle"
                        : schedule.type === "practical"
                        ? "TP"
                        : "Cours"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Colonne centrale */}
        <div className="flex flex-col gap-6">
          {/* Progression générale avec badge */}
          <div className="bg-white dark:bg-gray-950 rounded-xl border p-4 shadow">
            <div className="font-bold text-primary-700 dark:text-primary-200 mb-3 flex items-center gap-2">
              <Target size={18} />
              Progression générale
            </div>
            <div className="flex items-center justify-center mb-4">
              <ProgressChart
                data={progressData.subjects.map((s) => ({
                  name: s.name,
                  value: s.progress,
                }))}
                progress={progressData.progress}
              />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {progressData.progress}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Niveau {progressData.currentLevel} • Prochain : Niveau{" "}
                {progressData.nextLevel}
              </div>
            </div>
          </div>

          {/* Devoirs avec priorités */}
          <div className="bg-white dark:bg-gray-950 rounded-xl border p-4 shadow">
            <div className="font-bold text-primary-700 dark:text-primary-200 mb-3 flex items-center gap-2">
              <FileText size={18} />
              Mes devoirs
              <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-xs px-2 py-1 rounded-full ml-auto">
                {assignments.filter((a) => a.priority === "high").length}{" "}
                prioritaires
              </span>
            </div>
            <div className="space-y-2">
              {assignments.map((assignment, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg border-l-4 ${
                    assignment.priority === "high"
                      ? "bg-red-50 dark:bg-red-900/20 border-red-500"
                      : assignment.priority === "medium"
                      ? "bg-orange-50 dark:bg-orange-900/20 border-orange-500"
                      : "bg-green-50 dark:bg-green-900/20 border-green-500"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-sm text-gray-700 dark:text-gray-200">
                        {assignment.title}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {assignment.subject}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        À rendre : {assignment.dueDate}
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          assignment.status === "completed"
                            ? "bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200"
                            : assignment.status === "in-progress"
                            ? "bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200"
                            : "bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200"
                        }`}
                      >
                        {assignment.status === "completed"
                          ? "Terminé"
                          : assignment.status === "in-progress"
                          ? "En cours"
                          : "À faire"}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">
                        {assignment.priority === "high"
                          ? "Prioritaire"
                          : assignment.priority === "medium"
                          ? "Normal"
                          : "Faible"}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Colonne droite */}
        <div className="flex flex-col gap-6">
          {/* Classement */}
          <div className="bg-white dark:bg-gray-950 rounded-xl border p-4 shadow">
            <div className="font-bold text-primary-700 dark:text-primary-200 mb-3 flex items-center gap-2">
              <Trophy size={18} />
              Classement
            </div>
            <div className="space-y-2">
              {leaderboardData.map((student, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg ${
                    student.isCurrentUser
                      ? "bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-500"
                      : "bg-gray-50 dark:bg-gray-900"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          i === 0
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                            : i === 1
                            ? "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                            : i === 2
                            ? "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                            : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                        }`}
                      >
                        {student.rank}
                      </span>
                      <div>
                        <div className="font-semibold text-sm text-gray-700 dark:text-gray-200">
                          {student.name} {student.isCurrentUser && "(Vous)"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {student.score} points
                        </div>
                      </div>
                    </div>
                    <RewardBadge
                      type={
                        student.badge === "gold"
                          ? "or"
                          : student.badge === "silver"
                          ? "argent"
                          : "bronze"
                      }
                      label={student.badge}
                      description=""
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Badges obtenus */}
          <div className="bg-white dark:bg-gray-950 rounded-xl border p-4 shadow">
            <div className="font-bold text-primary-700 dark:text-primary-200 mb-3 flex items-center gap-2">
              <Award size={18} />
              Mes badges
            </div>
            <div className="grid grid-cols-2 gap-3">
              <RewardBadge
                type="bronze"
                label="Bronze"
                description="Niveau 1"
              />
              <RewardBadge
                type="argent"
                label="Argent"
                description="Niveau 2"
              />
              <RewardBadge type="or" label="Or" description="Niveau 3" />
              <RewardBadge
                type="star"
                label="Série"
                description="5 devoirs d&apos;affilée"
              />
            </div>
          </div>

          {/* Conseils personnalisés */}
          <div className="bg-white dark:bg-gray-950 rounded-xl border p-4 shadow">
            <div className="font-bold text-primary-700 dark:text-primary-200 mb-3 flex items-center gap-2">
              <Lightbulb size={18} />
              Conseils personnalisés
            </div>
            <div className="space-y-2">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                <div className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-1">
                  Réviser les équations
                </div>
                <div className="text-xs text-blue-600 dark:text-blue-300">
                  Votre prochain contrôle portera sur ce chapitre.
                </div>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
                <div className="text-sm font-semibold text-green-800 dark:text-green-200 mb-1">
                  Excellent travail !
                </div>
                <div className="text-xs text-green-600 dark:text-green-300">
                  Continuez comme ça en français.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions rapides optimisées */}
      <div className="flex gap-3 flex-wrap">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded flex items-center gap-2 shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600">
          <FileText size={18} /> Voir tous mes devoirs
        </button>
        <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded flex items-center gap-2 shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-600">
          <BookOpen size={18} /> Réviser
        </button>
        <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded flex items-center gap-2 shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-600">
          <MessageCircle size={18} /> Demander de l&apos;aide
        </button>
        <button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-4 py-2 rounded flex items-center gap-2 shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-600">
          <Target size={18} /> Voir mes notes
        </button>
        <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded flex items-center gap-2 shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-gray-400">
          <Filter size={18} /> Filtres
        </button>
      </div>

      {/* Notifications avec priorités */}
      <NotificationList notifications={notifications} />
    </section>
  );
}
