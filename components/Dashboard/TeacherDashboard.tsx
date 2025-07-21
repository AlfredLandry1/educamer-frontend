import KpiCard from "./KpiCard";
import NotificationList, { Notification } from "./NotificationList";
import DashboardBreadcrumbs from "./DashboardBreadcrumbs";
import {
  BarChart2,
  GraduationCap,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  FileText,
  MessageCircle,
  Users,
  Mail,
  Filter,
  Bell,
  Target,
  Calendar,
  Clock3,
  Trophy,
  Eye,
  Zap,
} from "lucide-react";

// Mock data enseignant optimisée
const user = {
  name: "M. Martin",
  subject: "Mathématiques",
  lastLogin: "Aujourd'hui à 08:30",
  experience: "8 ans",
  classes: [
    {
      name: "6ème A",
      students: 28,
      average: 14.2,
      completedAssignments: 85,
      attendance: 94,
      improvement: 12,
    },
    {
      name: "5ème B",
      students: 25,
      average: 13.8,
      completedAssignments: 92,
      attendance: 91,
      improvement: 8,
    },
    {
      name: "4ème C",
      students: 30,
      average: 12.9,
      completedAssignments: 78,
      attendance: 87,
      improvement: -3,
    },
  ],
  achievements: [
    {
      type: "excellence",
      label: "Excellence",
      description: "100% de réussite 6ème A",
      date: "Ce mois",
    },
    {
      type: "innovation",
      label: "Innovation",
      description: "Nouvelle méthode géométrie",
      date: "Semaine dernière",
    },
  ],
};

const kpis = [
  {
    label: "Classes gérées",
    value: user.classes.length,
    icon: <GraduationCap size={28} />,
    color: "info" as const,
    trend: "+1 cette année",
  },
  {
    label: "Élèves total",
    value: user.classes.reduce((a, c) => a + c.students, 0),
    icon: <Users size={28} />,
    color: "success" as const,
    trend: "+5 vs l'an dernier",
  },
  {
    label: "Devoirs à corriger",
    value: 12,
    icon: <FileText size={28} />,
    color: "warning" as const,
    trend: "3 nouveaux aujourd'hui",
  },
  {
    label: "Moyenne générale",
    value:
      (
        user.classes.reduce((a, c) => a + c.average, 0) / user.classes.length
      ).toFixed(1) + "/20",
    icon: <Target size={28} />,
    color: "success" as const,
    trend: "+0.8 vs trimestre dernier",
  },
];

const notifications: Notification[] = [
  {
    id: "1",
    type: "info",
    message: "5 nouveaux devoirs rendus en 6ème A.",
    date: "Aujourd'hui",
    read: false,
    priority: "high",
  },
  {
    id: "2",
    type: "achievement",
    message: "Marie Dupont a obtenu 18/20 au dernier contrôle !",
    date: "Hier",
    read: false,
    priority: "medium",
  },
  {
    id: "3",
    type: "warning",
    message: "3 élèves en difficulté en 4ème C.",
    date: "Hier",
    read: true,
    priority: "high",
  },
  {
    id: "4",
    type: "info",
    message: "Réunion parents-profs 6ème A confirmée.",
    date: "Il y a 2 jours",
    read: false,
    priority: "low",
  },
];

const assignmentsToGrade = [
  {
    class: "6ème A",
    title: "Géométrie - Triangles",
    students: 28,
    submitted: 25,
    dueDate: "15/09",
    priority: "high",
    subject: "Géométrie",
  },
  {
    class: "5ème B",
    title: "Algèbre - Équations",
    students: 25,
    submitted: 23,
    dueDate: "16/09",
    priority: "medium",
    subject: "Algèbre",
  },
  {
    class: "4ème C",
    title: "Problèmes - Proportions",
    students: 30,
    submitted: 28,
    dueDate: "17/09",
    priority: "low",
    subject: "Problèmes",
  },
];

const upcomingExams = [
  {
    class: "6ème A",
    subject: "Contrôle géométrie",
    date: "20/09",
    duration: "1h",
    type: "control",
    preparation: "ready",
  },
  {
    class: "5ème B",
    subject: "Devoir algèbre",
    date: "22/09",
    duration: "1h30",
    type: "assignment",
    preparation: "in-progress",
  },
  {
    class: "4ème C",
    subject: "Évaluation proportions",
    date: "25/09",
    duration: "1h",
    type: "evaluation",
    preparation: "not-started",
  },
];

const studentStats = [
  {
    name: "Marie Dupont",
    class: "6ème A",
    progress: 92,
    lastGrade: 18,
    status: "excellent",
    trend: "up",
    attendance: 100,
  },
  {
    name: "Lucas Martin",
    class: "5ème B",
    progress: 78,
    lastGrade: 14,
    status: "good",
    trend: "stable",
    attendance: 95,
  },
  {
    name: "Emma Bernard",
    class: "4ème C",
    progress: 65,
    lastGrade: 11,
    status: "needs-help",
    trend: "down",
    attendance: 85,
  },
  {
    name: "Thomas Leroy",
    class: "6ème A",
    progress: 88,
    lastGrade: 16,
    status: "good",
    trend: "up",
    attendance: 92,
  },
];

const classPerformance = [
  {
    class: "6ème A",
    average: 14.2,
    participation: 85,
    completion: 92,
    improvement: 12,
    attendance: 94,
  },
  {
    class: "5ème B",
    average: 13.8,
    participation: 78,
    completion: 88,
    improvement: 8,
    attendance: 91,
  },
  {
    class: "4ème C",
    average: 12.9,
    participation: 72,
    completion: 75,
    improvement: -3,
    attendance: 87,
  },
];

const upcomingEvents = [
  {
    title: "Réunion parents-profs 6ème A",
    date: "18/09",
    time: "18h00",
    type: "meeting",
    priority: "high",
  },
  {
    title: "Conseil de classe",
    date: "25/09",
    time: "16h00",
    type: "meeting",
    priority: "medium",
  },
  {
    title: "Formation pédagogique",
    date: "28/09",
    time: "14h00",
    type: "training",
    priority: "low",
  },
];

const weeklySchedule = [
  {
    day: "Lundi",
    class: "6ème A",
    time: "08h-10h",
    topic: "Géométrie",
    room: "Salle 12",
  },
  {
    day: "Lundi",
    class: "5ème B",
    time: "10h-12h",
    topic: "Algèbre",
    room: "Salle 12",
  },
  {
    day: "Mardi",
    class: "4ème C",
    time: "14h-16h",
    topic: "Problèmes",
    room: "Salle 15",
  },
  {
    day: "Mercredi",
    class: "6ème A",
    time: "08h-10h",
    topic: "Contrôle",
    room: "Salle 12",
  },
];

const quickActions = [
  {
    title: "Créer un devoir",
    icon: <FileText size={20} />,
    color: "blue",
    action: "create-assignment",
  },
  {
    title: "Planifier un contrôle",
    icon: <Target size={20} />,
    color: "red",
    action: "schedule-exam",
  },
  {
    title: "Envoyer un message",
    icon: <MessageCircle size={20} />,
    color: "green",
    action: "send-message",
  },
  {
    title: "Voir les statistiques",
    icon: <BarChart2 size={20} />,
    color: "purple",
    action: "view-stats",
  },
];

export default function TeacherDashboard() {
  return (
    <section className="w-full animate-fade-in flex flex-col gap-8">
      {/* Header avec breadcrumbs */}
      <div>
        <DashboardBreadcrumbs />
      </div>
      {/* Message d'accueil personnalisé optimisé */}
      <div className="bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900 dark:to-blue-900 rounded-xl p-6 flex items-center gap-4 shadow-lg">
        <div className="bg-primary-100 dark:bg-primary-800 p-3 rounded-full">
          <GraduationCap
            className="text-primary-600 dark:text-primary-400"
            size={32}
          />
        </div>
        <div className="flex-1">
          <div className="font-bold text-xl text-primary-800 dark:text-primary-100">
            Bonjour {user.name} 👋
          </div>
          <div className="text-sm text-primary-700 dark:text-primary-200">
            Matière : {user.subject} • Expérience : {user.experience}
          </div>
          <div className="text-xs text-primary-600 dark:text-primary-300 mt-1">
            Vous gérez {user.classes.length} classe(s) et{" "}
            {user.classes.reduce((a, c) => a + c.students, 0)} élève(s)
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
          {/* Devoirs à corriger avec priorités */}
          <div className="bg-white dark:bg-gray-950 rounded-xl border p-4 shadow">
            <div className="font-bold text-primary-700 dark:text-primary-200 mb-3 flex items-center gap-2">
              <FileText size={18} />
              Devoirs à corriger
              <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-xs px-2 py-1 rounded-full ml-auto">
                {assignmentsToGrade.filter((a) => a.priority === "high").length}{" "}
                prioritaires
              </span>
            </div>
            <div className="space-y-3">
              {assignmentsToGrade.map((assignment, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg border-l-4 ${
                    assignment.priority === "high"
                      ? "bg-red-50 dark:bg-red-900/20 border-red-500"
                      : assignment.priority === "medium"
                      ? "bg-orange-50 dark:bg-orange-900/20 border-orange-500"
                      : "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-semibold text-sm text-gray-800 dark:text-gray-200">
                        {assignment.class}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {assignment.title}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {assignment.subject}
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          assignment.priority === "high"
                            ? "bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200"
                            : assignment.priority === "medium"
                            ? "bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-200"
                            : "bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200"
                        }`}
                      >
                        {assignment.priority === "high"
                          ? "Prioritaire"
                          : assignment.priority === "medium"
                          ? "Normal"
                          : "Faible"}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">
                        {assignment.dueDate}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-600 dark:text-gray-300">
                    <span>
                      {assignment.submitted}/{assignment.students} rendus
                    </span>
                    <div className="flex items-center gap-1">
                      <CheckCircle size={14} className="text-green-600" />
                      <span>
                        {Math.round(
                          (assignment.submitted / assignment.students) * 100
                        )}
                        %
                      </span>
                    </div>
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
                  className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-sm text-blue-800 dark:text-blue-200">
                        {schedule.day} - {schedule.time}
                      </div>
                      <div className="text-xs text-blue-600 dark:text-blue-300">
                        {schedule.class}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {schedule.topic} • {schedule.room}
                      </div>
                    </div>
                    <div className="text-xs bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                      Cours
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Colonne centrale */}
        <div className="flex flex-col gap-6">
          {/* Performance des classes avec tendances */}
          <div className="bg-white dark:bg-gray-950 rounded-xl border p-4 shadow">
            <div className="font-bold text-primary-700 dark:text-primary-200 mb-3 flex items-center gap-2">
              <BarChart2 size={18} />
              Performance des classes
            </div>
            <div className="space-y-3">
              {classPerformance.map((cls, i) => (
                <div
                  key={i}
                  className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-sm text-gray-700 dark:text-gray-200">
                      {cls.class}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-primary-600 dark:text-primary-400">
                        {cls.average}/20
                      </span>
                      {cls.improvement > 0 ? (
                        <TrendingUp size={14} className="text-green-600" />
                      ) : (
                        <TrendingDown size={14} className="text-red-600" />
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      <Users size={12} />
                      <span>Participation : {cls.participation}%</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle size={12} />
                      <span>Complétion : {cls.completion}%</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock3 size={12} />
                      <span>Présence : {cls.attendance}%</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp size={12} />
                      <span
                        className={
                          cls.improvement > 0
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {cls.improvement > 0 ? "+" : ""}
                        {cls.improvement}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Élèves en vue avec tendances */}
          <div className="bg-white dark:bg-gray-950 rounded-xl border p-4 shadow">
            <div className="font-bold text-primary-700 dark:text-primary-200 mb-3 flex items-center gap-2">
              <Eye size={18} />
              Élèves en vue
            </div>
            <div className="space-y-2">
              {studentStats.map((student, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg border-l-4 ${
                    student.status === "excellent"
                      ? "bg-green-50 dark:bg-green-900/20 border-green-500"
                      : student.status === "good"
                      ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500"
                      : "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-sm text-gray-700 dark:text-gray-200">
                        {student.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {student.class}
                      </div>
                      <div className="text-xs text-gray-500">
                        Progression : {student.progress}%
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-gray-700 dark:text-gray-200">
                        {student.lastGrade}/20
                      </div>
                      <div className="flex items-center gap-1">
                        {student.trend === "up" ? (
                          <TrendingUp size={12} className="text-green-600" />
                        ) : student.trend === "down" ? (
                          <TrendingDown size={12} className="text-red-600" />
                        ) : (
                          <div className="w-3 h-0.5 bg-gray-400"></div>
                        )}
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            student.status === "excellent"
                              ? "bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200"
                              : student.status === "good"
                              ? "bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200"
                              : "bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200"
                          }`}
                        >
                          {student.status === "excellent"
                            ? "Excellent"
                            : student.status === "good"
                            ? "Bon"
                            : "Aide nécessaire"}
                        </span>
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
          {/* Contrôles à venir avec statut de préparation */}
          <div className="bg-white dark:bg-gray-950 rounded-xl border p-4 shadow">
            <div className="font-bold text-primary-700 dark:text-primary-200 mb-3 flex items-center gap-2">
              <Target size={18} />
              Contrôles à venir
            </div>
            <div className="space-y-2">
              {upcomingExams.map((exam, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg border-l-4 ${
                    exam.preparation === "ready"
                      ? "bg-green-50 dark:bg-green-900/20 border-green-500"
                      : exam.preparation === "in-progress"
                      ? "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500"
                      : "bg-red-50 dark:bg-red-900/20 border-red-500"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-sm text-gray-700 dark:text-gray-200">
                        {exam.class}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {exam.subject}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Durée : {exam.duration}
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          exam.preparation === "ready"
                            ? "bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200"
                            : exam.preparation === "in-progress"
                            ? "bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200"
                            : "bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200"
                        }`}
                      >
                        {exam.preparation === "ready"
                          ? "Prêt"
                          : exam.preparation === "in-progress"
                          ? "En cours"
                          : "À préparer"}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">
                        {exam.date}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Messages parents avec priorités */}
          <div className="bg-white dark:bg-gray-950 rounded-xl border p-4 shadow">
            <div className="font-bold text-primary-700 dark:text-primary-200 mb-3 flex items-center gap-2">
              <Mail size={18} />
              Messages parents
            </div>
            <div className="space-y-2">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-sm text-blue-800 dark:text-blue-200">
                    Mme Dupont
                  </span>
                  <span className="text-xs text-gray-500">Aujourd&apos;hui</span>
                </div>
                <div className="text-xs text-blue-600 dark:text-blue-300 mb-1">
                  6ème A - Marie
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-200">
                  Question sur le devoir de géométrie.
                </div>
                <span className="inline-block bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded mt-2">
                  À répondre
                </span>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-sm text-green-800 dark:text-green-200">
                    M. Martin
                  </span>
                  <span className="text-xs text-gray-500">Hier</span>
                </div>
                <div className="text-xs text-green-600 dark:text-green-300 mb-1">
                  5ème B - Lucas
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-200">
                  Remerciements pour le soutien.
                </div>
                <span className="inline-block bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 text-xs px-2 py-1 rounded mt-2">
                  Lu
                </span>
              </div>
            </div>
          </div>

          {/* Événements à venir avec priorités */}
          <div className="bg-white dark:bg-gray-950 rounded-xl border p-4 shadow">
            <div className="font-bold text-primary-700 dark:text-primary-200 mb-3 flex items-center gap-2">
              <Bell size={18} />
              Événements à venir
            </div>
            <div className="space-y-2">
              {upcomingEvents.map((event, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg border-l-4 ${
                    event.priority === "high"
                      ? "bg-red-50 dark:bg-red-900/20 border-red-500"
                      : event.priority === "medium"
                      ? "bg-purple-50 dark:bg-purple-900/20 border-purple-500"
                      : "bg-blue-50 dark:bg-blue-900/20 border-blue-500"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-sm text-gray-700 dark:text-gray-200">
                        {event.title}
                      </div>
                      <div className="text-xs text-gray-500">
                        {event.date} à {event.time}
                      </div>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        event.priority === "high"
                          ? "bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200"
                          : event.priority === "medium"
                          ? "bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200"
                          : "bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200"
                      }`}
                    >
                      {event.type === "meeting"
                        ? "Réunion"
                        : event.type === "training"
                        ? "Formation"
                        : "Événement"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Actions rapides optimisées */}
      <div className="flex gap-3 flex-wrap">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded flex items-center gap-2 shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600">
          <FileText size={18} /> Créer un devoir
        </button>
        <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded flex items-center gap-2 shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-600">
          <MessageCircle size={18} /> Contacter parents
        </button>
        <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded flex items-center gap-2 shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-600">
          <BarChart2 size={18} /> Voir statistiques
        </button>
        <button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-4 py-2 rounded flex items-center gap-2 shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-600">
          <Calendar size={18} /> Planning
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
