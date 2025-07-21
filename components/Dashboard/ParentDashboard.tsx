import KpiCard from "./KpiCard";
import RewardBadge from "./RewardBadge";
import NotificationList, { Notification } from "./NotificationList";
import DashboardBreadcrumbs from "./DashboardBreadcrumbs";
import {
  ClipboardList,
  BarChart2,
  Award,
  User,
  MessageCircle,
  Calendar,
  Users,
  Mail,
  Activity,
  Target,
  Bell,
  Filter,
  Zap,
  Trophy,
  Lightbulb,
} from "lucide-react";

// Mock data parent optimisée
const user = {
  name: "Mme Parent",
  lastLogin: "Aujourd'hui à 09:10",
  experience: "5 ans",
  children: [
    {
      name: "Alice Dupont",
      progression: 72,
      badges: 3,
      devoirsARendre: 2,
      presence: 95,
      notes: [15, 18, 14, 16],
    },
    {
      name: "Lucas Parent",
      progression: 58,
      badges: 1,
      devoirsARendre: 1,
      presence: 88,
      notes: [12, 13, 11, 15],
    },
  ],
  achievements: [
    {
      type: "star",
      label: "Série",
      description: "Suivi régulier",
      date: "Ce mois",
    },
    {
      type: "award",
      label: "Engagement",
      description: "Communication active",
      date: "Semaine dernière",
    },
  ],
};

const kpis = [
  {
    label: "Enfants suivis",
    value: user.children.length,
    icon: <Users size={28} />,
    color: "info" as const,
    trend: "+1 cette année",
  },
  {
    label: "Progression moyenne",
    value:
      Math.round(
        user.children.reduce((a, c) => a + c.progression, 0) /
          user.children.length
      ) + "%",
    icon: <BarChart2 size={28} />,
    color: "success" as const,
    trend: "+8% ce trimestre",
  },
  {
    label: "Devoirs à surveiller",
    value: user.children.reduce((a, c) => a + c.devoirsARendre, 0),
    icon: <ClipboardList size={28} />,
    color: "warning" as const,
    trend: "2 nouveaux cette semaine",
  },
  {
    label: "Badges cumulés",
    value: user.children.reduce((a, c) => a + c.badges, 0),
    icon: <Award size={28} />,
    color: "info" as const,
    trend: "+1 ce mois",
  },
];

const notifications: Notification[] = [
  {
    id: "1",
    type: "info",
    message: "Alice a rendu son devoir de maths.",
    date: "Aujourd'hui",
    read: false,
    priority: "medium",
  },
  {
    id: "2",
    type: "achievement",
    message: "Lucas a débloqué le badge Bronze !",
    date: "Hier",
    read: false,
    priority: "high",
  },
  {
    id: "3",
    type: "warning",
    message: "Devoir de français à rendre pour Alice.",
    date: "Hier",
    read: true,
    priority: "high",
  },
  {
    id: "4",
    type: "success",
    message: "Réunion parents-profs confirmée.",
    date: "Il y a 2 jours",
    read: false,
    priority: "low",
  },
];

const upcomingAssignments = [
  {
    child: "Alice Dupont",
    title: "Devoir de maths",
    dueDate: "15/09",
    priority: "high",
    subject: "Mathématiques",
  },
  {
    child: "Lucas Parent",
    title: "Projet sciences",
    dueDate: "18/09",
    priority: "medium",
    subject: "Sciences",
  },
];

const badgeHistory = [
  {
    type: "bronze" as const,
    label: "Bronze",
    description: "Lucas : Niveau 1 atteint",
    date: "10/09",
  },
  {
    type: "star" as const,
    label: "Série de réussite",
    description: "Alice : 5 devoirs rendus d'affilée",
    date: "12/09",
  },
];

// Nouvelles données mock
const teacherMessages = [
  {
    teacher: "M. Martin",
    subject: "Mathématiques",
    message: "Alice progresse bien en géométrie.",
    date: "Aujourd'hui",
    priority: "low",
  },
  {
    teacher: "Mme Dubois",
    subject: "Français",
    message: "Lucas doit améliorer sa rédaction.",
    date: "Hier",
    priority: "high",
  },
];

const upcomingEvents = [
  {
    title: "Réunion parents-profs",
    date: "20/09",
    time: "18h00",
    type: "meeting",
    priority: "high",
  },
  {
    title: "Sortie scolaire",
    date: "25/09",
    time: "09h00",
    type: "trip",
    priority: "medium",
  },
  {
    title: "Contrôle de maths",
    date: "22/09",
    time: "14h00",
    type: "exam",
    priority: "low",
  },
];

const activitySuggestions = [
  {
    title: "Aider avec les devoirs",
    description: "15 min de révision maths",
    difficulty: "Facile",
    child: "Alice",
    priority: "high",
  },
  {
    title: "Lecture en famille",
    description: "30 min de lecture partagée",
    difficulty: "Moyen",
    child: "Lucas",
    priority: "medium",
  },
  {
    title: "Jeux éducatifs",
    description: "20 min de jeux de logique",
    difficulty: "Facile",
    child: "Tous",
    priority: "low",
  },
];

const quickActions = [
  {
    title: "Contacter enseignant",
    icon: <MessageCircle size={20} />,
    color: "blue",
    action: "contact-teacher",
  },
  {
    title: "Voir mon profil",
    icon: <User size={20} />,
    color: "green",
    action: "view-profile",
  },
  {
    title: "Calendrier complet",
    icon: <Calendar size={20} />,
    color: "purple",
    action: "view-calendar",
  },
  {
    title: "Demander de l'aide",
    icon: <Mail size={20} />,
    color: "orange",
    action: "ask-help",
  },
];

export default function ParentDashboard() {
  return (
    <section className="w-full animate-fade-in flex flex-col gap-8">
      {/* Header avec breadcrumbs */}
      <div>
        <DashboardBreadcrumbs />
      </div>
      {/* Message d'accueil personnalisé optimisé */}
      <div className="bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900 dark:to-blue-900 rounded-xl p-6 flex items-center gap-4 shadow-lg">
        <div className="bg-primary-100 dark:bg-primary-800 p-3 rounded-full">
          <Users className="text-primary-600 dark:text-primary-400" size={32} />
        </div>
        <div className="flex-1">
          <div className="font-bold text-xl text-primary-800 dark:text-primary-100">
            Bonjour {user.name} 👋
          </div>
          <div className="text-sm text-primary-700 dark:text-primary-200">
            Dernière connexion : {user.lastLogin} • Expérience :{" "}
            {user.experience}
          </div>
          <div className="text-xs text-primary-600 dark:text-primary-300 mt-1">
            Vous suivez {user.children.length} enfant(s) • Progression moyenne :{" "}
            {Math.round(
              user.children.reduce((a, c) => a + c.progression, 0) /
                user.children.length
            )}
            %
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
          {/* Prochaines échéances avec priorités */}
          <div className="bg-white dark:bg-gray-950 rounded-xl border p-4 shadow">
            <div className="font-bold text-primary-700 dark:text-primary-200 mb-3 flex items-center gap-2">
              <Calendar size={18} />
              Prochaines échéances
              <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-xs px-2 py-1 rounded-full ml-auto">
                {
                  upcomingAssignments.filter((a) => a.priority === "high")
                    .length
                }{" "}
                prioritaires
              </span>
            </div>
            <div className="space-y-2">
              {upcomingAssignments.map((assignment, i) => (
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
                        {assignment.child}
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
                            : "bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200"
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
                </div>
              ))}
            </div>
          </div>

          {/* Messages des enseignants avec priorités */}
          <div className="bg-white dark:bg-gray-950 rounded-xl border p-4 shadow">
            <div className="font-bold text-primary-700 dark:text-primary-200 mb-3 flex items-center gap-2">
              <Mail size={18} />
              Messages des enseignants
            </div>
            <div className="space-y-3">
              {teacherMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg border-l-4 ${
                    msg.priority === "high"
                      ? "bg-red-50 dark:bg-red-900/20 border-red-500"
                      : "bg-blue-50 dark:bg-blue-900/20 border-blue-500"
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-semibold text-sm text-gray-800 dark:text-gray-200">
                      {msg.teacher}
                    </span>
                    <span className="text-xs text-gray-500">{msg.date}</span>
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                    {msg.subject}
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-200">
                    {msg.message}
                  </div>
                  <span
                    className={`inline-block text-xs px-2 py-1 rounded mt-2 ${
                      msg.priority === "high"
                        ? "bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200"
                        : "bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200"
                    }`}
                  >
                    {msg.priority === "high" ? "Important" : "Information"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Suggestions d'activités avec priorités */}
          <div className="bg-white dark:bg-gray-950 rounded-xl border p-4 shadow">
            <div className="font-bold text-primary-700 dark:text-primary-200 mb-3 flex items-center gap-2">
              <Activity size={18} />
              Suggestions d&apos;activités
            </div>
            <div className="space-y-2">
              {activitySuggestions.map((activity, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg border-l-4 ${
                    activity.priority === "high"
                      ? "bg-red-50 dark:bg-red-900/20 border-red-500"
                      : activity.priority === "medium"
                      ? "bg-orange-50 dark:bg-orange-900/20 border-orange-500"
                      : "bg-green-50 dark:bg-green-900/20 border-green-500"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-sm text-gray-800 dark:text-gray-200">
                        {activity.title}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {activity.description}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Pour : {activity.child}
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          activity.priority === "high"
                            ? "bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200"
                            : activity.priority === "medium"
                            ? "bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-200"
                            : "bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200"
                        }`}
                      >
                        {activity.difficulty}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">
                        {activity.priority === "high"
                          ? "Prioritaire"
                          : activity.priority === "medium"
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

        {/* Colonne centrale */}
        <div className="flex flex-col gap-6">
          {/* Progression par enfant avec tendances */}
          <div className="bg-white dark:bg-gray-950 rounded-xl border p-4 shadow">
            <div className="font-bold text-primary-700 dark:text-primary-200 mb-3 flex items-center gap-2">
              <BarChart2 size={18} />
              Progression des enfants
            </div>
            <div className="space-y-4">
              {user.children.map((child, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="font-semibold text-sm text-gray-700 dark:text-gray-200">
                      {child.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      Présence : {child.presence}%
                    </div>
                    <div className="text-xs text-gray-500">
                      Badges : {child.badges}
                    </div>
                  </div>
                  <div className="w-16 h-16 relative flex items-center justify-center">
                    <svg width="64" height="64">
                      <circle cx="32" cy="32" r="28" fill="#f3f4f6" />
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        fill="none"
                        stroke="#0ea5e9"
                        strokeWidth="4"
                        strokeDasharray={2 * Math.PI * 28}
                        strokeDashoffset={
                          2 * Math.PI * 28 * (1 - child.progression / 100)
                        }
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-primary-700 dark:text-primary-200">
                      {child.progression}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Résumé des notes avec tendances */}
          <div className="bg-white dark:bg-gray-950 rounded-xl border p-4 shadow">
            <div className="font-bold text-primary-700 dark:text-primary-200 mb-3 flex items-center gap-2">
              <Target size={18} />
              Résumé des notes
            </div>
            <div className="space-y-3">
              {user.children.map((child, i) => (
                <div
                  key={i}
                  className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"
                >
                  <div className="font-semibold text-sm text-gray-700 dark:text-gray-200 mb-2">
                    {child.name}
                  </div>
                  <div className="flex gap-2 mb-2">
                    {child.notes.map((note, j) => (
                      <div
                        key={j}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                          note >= 16
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : note >= 12
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        }`}
                      >
                        {note}
                      </div>
                    ))}
                  </div>
                  <div className="text-xs text-gray-500">
                    Moyenne :{" "}
                    {(
                      child.notes.reduce((a, b) => a + b, 0) /
                      child.notes.length
                    ).toFixed(1)}
                    /20
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Colonne droite */}
        <div className="flex flex-col gap-6">
          {/* Calendrier des événements avec priorités */}
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
                      ? "bg-orange-50 dark:bg-orange-900/20 border-orange-500"
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
                    <div className="text-right">
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          event.type === "meeting"
                            ? "bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200"
                            : event.type === "trip"
                            ? "bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200"
                            : "bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-200"
                        }`}
                      >
                        {event.type === "meeting"
                          ? "Réunion"
                          : event.type === "trip"
                          ? "Sortie"
                          : "Contrôle"}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">
                        {event.priority === "high"
                          ? "Prioritaire"
                          : event.priority === "medium"
                          ? "Normal"
                          : "Faible"}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Historique des badges/récompenses */}
          <div className="bg-white dark:bg-gray-950 rounded-xl border p-4 shadow">
            <div className="font-bold text-primary-700 dark:text-primary-200 mb-3 flex items-center gap-2">
              <Award size={18} />
              Historique des badges
            </div>
            <div className="space-y-3">
              {badgeHistory.map((b, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"
                >
                  <RewardBadge
                    type={b.type}
                    label={b.label}
                    description={b.description}
                  />
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                      {b.description}
                    </div>
                    <div className="text-xs text-gray-500">{b.date}</div>
                  </div>
                </div>
              ))}
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
                  Encourager Lucas
                </div>
                <div className="text-xs text-blue-600 dark:text-blue-300">
                  Il progresse bien en maths, continuez à l&apos;encourager.
                </div>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
                <div className="text-sm font-semibold text-green-800 dark:text-green-200 mb-1">
                  Alice excelle
                </div>
                <div className="text-xs text-green-600 dark:text-green-300">
                  Excellent travail, félicitez-la pour ses efforts.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions rapides optimisées */}
      <div className="flex gap-3 flex-wrap">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded flex items-center gap-2 shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600">
          <MessageCircle size={18} /> Contacter un enseignant
        </button>
        <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded flex items-center gap-2 shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-gray-400">
          <User size={18} /> Voir mon profil
        </button>
        <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded flex items-center gap-2 shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-600">
          <Calendar size={18} /> Voir le calendrier complet
        </button>
        <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded flex items-center gap-2 shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-600">
          <Mail size={18} /> Demander de l&apos;aide
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
