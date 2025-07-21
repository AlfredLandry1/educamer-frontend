"use client";
import { useState } from "react";
import {
  Clock,
  Calendar,
  FileText,
  Upload,
  CheckCircle,
  AlertCircle,
  Eye,
  Download,
  Search,
  SortAsc,
  SortDesc,
  Target,
  MessageCircle,
  ClipboardList,
} from "lucide-react";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import DashboardBreadcrumbs from "@/components/Dashboard/DashboardBreadcrumbs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import KpiCard from "@/components/Dashboard/KpiCard";
import { Formik, Form, Field, useField } from "formik";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// Mock data des devoirs
const assignments = [
  {
    id: "1",
    title: "Devoir de Mathématiques - Équations",
    course: "Mathématiques Collège",
    courseSlug: "mathematiques-college",
    description:
      "Résoudre les équations du premier degré et justifier chaque étape de la résolution.",
    dueDate: "2024-02-15T23:59:00Z",
    assignedDate: "2024-02-01T10:00:00Z",
    status: "pending", // pending, submitted, graded, late
    grade: null,
    maxGrade: 20,
    feedback: "",
    teacher: {
      name: "Prof. Martin",
      avatar: "/api/placeholder/40/40",
    },
    attachments: [
      { name: "Sujet_equations.pdf", size: "2.3 MB", type: "pdf" },
      { name: "Exercices_supplementaires.pdf", size: "1.1 MB", type: "pdf" },
    ],
    requirements: [
      "Justifier chaque étape de calcul",
      "Présenter les solutions de manière claire",
      "Vérifier les résultats obtenus",
    ],
    submission: null,
    timeSpent: 0, // minutes
    difficulty: "Moyen",
    estimatedTime: 45, // minutes
    xpReward: 50,
    coinsReward: 25,
  },
  {
    id: "2",
    title: "Rédaction - Analyse de texte",
    course: "Français Collège",
    courseSlug: "francais-college",
    description:
      "Analyser le texte fourni en identifiant les figures de style et en expliquant leur effet sur le lecteur.",
    dueDate: "2024-02-20T23:59:00Z",
    assignedDate: "2024-02-05T14:30:00Z",
    status: "submitted",
    grade: 16,
    maxGrade: 20,
    feedback:
      "Excellent travail ! Votre analyse est pertinente et bien structurée. Quelques petites erreurs de syntaxe à corriger.",
    teacher: {
      name: "Prof. Dubois",
      avatar: "/api/placeholder/40/40",
    },
    attachments: [
      { name: "Texte_analyse.pdf", size: "1.8 MB", type: "pdf" },
      { name: "Grille_evaluation.pdf", size: "0.9 MB", type: "pdf" },
    ],
    requirements: [
      "Minimum 2 pages",
      "Introduction, développement, conclusion",
      "Citations du texte obligatoires",
    ],
    submission: {
      id: "sub-1",
      submittedAt: "2024-02-18T15:30:00Z",
      files: [{ name: "Analyse_texte_marie.pdf", size: "3.2 MB", type: "pdf" }],
      comment:
        "J&apos;ai essayé de bien structurer mon analyse avec des exemples concrets du texte.",
    },
    timeSpent: 120,
    difficulty: "Difficile",
    estimatedTime: 90,
    xpReward: 75,
    coinsReward: 40,
  },
  {
    id: "3",
    title: "Expérience scientifique - Photosynthèse",
    course: "Sciences Collège",
    courseSlug: "sciences-college",
    description:
      "Concevoir et réaliser une expérience pour observer la photosynthèse chez les plantes.",
    dueDate: "2024-02-10T23:59:00Z",
    assignedDate: "2024-01-28T09:00:00Z",
    status: "late",
    grade: null,
    maxGrade: 20,
    feedback: "",
    teacher: {
      name: "Prof. Bernard",
      avatar: "/api/placeholder/40/40",
    },
    attachments: [
      { name: "Protocole_experience.pdf", size: "4.1 MB", type: "pdf" },
      { name: "Fiche_observation.xlsx", size: "0.5 MB", type: "excel" },
    ],
    requirements: [
      "Photos de l&apos;expérience",
      "Compte-rendu détaillé",
      "Interprétation des résultats",
    ],
    submission: null,
    timeSpent: 0,
    difficulty: "Facile",
    estimatedTime: 60,
    xpReward: 30,
    coinsReward: 15,
  },
  {
    id: "4",
    title: "Projet Histoire - Révolution française",
    course: "Histoire Collège",
    courseSlug: "histoire-college",
    description:
      "Créer une présentation sur un aspect de la Révolution française de votre choix.",
    dueDate: "2024-02-25T23:59:00Z",
    assignedDate: "2024-02-08T11:15:00Z",
    status: "pending",
    grade: null,
    maxGrade: 20,
    feedback: "",
    teacher: {
      name: "Prof. Moreau",
      avatar: "/api/placeholder/40/40",
    },
    attachments: [
      { name: "Sujets_projet.pdf", size: "2.7 MB", type: "pdf" },
      { name: "Ressources_bibliographiques.pdf", size: "3.2 MB", type: "pdf" },
    ],
    requirements: [
      "Présentation PowerPoint ou Google Slides",
      "Minimum 10 diapositives",
      "Bibliographie incluse",
    ],
    submission: null,
    timeSpent: 0,
    difficulty: "Moyen",
    estimatedTime: 120,
    xpReward: 60,
    coinsReward: 30,
  },
];

// Composant FileDropzone avancé, compatible Formik
function FileDropzone({
  name,
  maxFiles = 5,
  maxSize = 10 * 1024 * 1024,
  accept = [".pdf", ".doc", ".docx", ".jpg", ".png"],
}: {
  name: string;
  maxFiles?: number;
  maxSize?: number;
  accept?: string[];
}) {
  const [field, , helpers] = useField(name);
  const files: File[] = field.value || [];
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    let dropped = Array.from(e.dataTransfer.files);
    dropped = dropped.filter(
      (f: File) =>
        accept.includes("." + f.name.split(".").pop()?.toLowerCase()) &&
        f.size <= maxSize
    );
    if (files.length + dropped.length > maxFiles)
      dropped = dropped.slice(0, maxFiles - files.length);
    helpers.setValue([...files, ...dropped]);
  };
  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let selected = Array.from(e.target.files || []);
    selected = selected.filter(
      (f: File) =>
        accept.includes("." + f.name.split(".").pop()?.toLowerCase()) &&
        f.size <= maxSize
    );
    if (files.length + selected.length > maxFiles)
      selected = selected.slice(0, maxFiles - files.length);
    helpers.setValue([...files, ...selected]);
  };
  const removeFile = (i: number) =>
    helpers.setValue(files.filter((_: File, idx: number) => idx !== i));
  return (
    <div
      className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center cursor-pointer bg-gray-50 dark:bg-gray-900"
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
      tabIndex={0}
      aria-label="Déposer des fichiers ici"
      onClick={() => document.getElementById("file-input")?.click()}
    >
      <Upload size={48} className="mx-auto text-gray-400 mb-4" />
      <p className="text-gray-600 dark:text-gray-400 mb-2">
        Glissez vos fichiers ici ou cliquez pour sélectionner
      </p>
      <Input
        id="file-input"
        type="file"
        multiple
        accept={accept.join(",")}
        className="hidden"
        onChange={onInput}
      />
      <div className="flex flex-col gap-2 mt-4">
        {files.length > 0 &&
          files.map((file, i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-white dark:bg-gray-800 rounded px-3 py-2 border"
            >
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-blue-600" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {file.name}
                </span>
                <span className="text-xs text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} Mo
                </span>
              </div>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(i);
                }}
              >
                Supprimer
              </Button>
            </div>
          ))}
      </div>
      <div className="text-xs text-gray-500 mt-2">
        {files.length}/{maxFiles} fichiers, max {maxSize / 1024 / 1024} Mo
        chacun
      </div>
    </div>
  );
}

export default function AssignmentsPage() {
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<string>("dueDate");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedAssignment, setSelectedAssignment] = useState<string | null>(
    null
  );
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);

  const filteredAssignments = assignments
    .filter((assignment) => {
      const matchesStatus =
        filterStatus === "all" || assignment.status === filterStatus;
      const matchesSearch =
        assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assignment.course.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case "dueDate":
          comparison =
            new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
          break;
        case "title":
          comparison = a.title.localeCompare(b.title);
          break;
        case "course":
          comparison = a.course.localeCompare(b.course);
          break;
        case "grade":
          comparison = (a.grade || 0) - (b.grade || 0);
          break;
        default:
          comparison = 0;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900";
      case "submitted":
        return "text-blue-600 bg-blue-100 dark:bg-blue-900";
      case "graded":
        return "text-green-600 bg-green-100 dark:bg-green-900";
      case "late":
        return "text-red-600 bg-red-100 dark:bg-red-900";
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock size={16} />;
      case "submitted":
        return <Upload size={16} />;
      case "graded":
        return <CheckCircle size={16} />;
      case "late":
        return <AlertCircle size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "En attente";
      case "submitted":
        return "Soumis";
      case "graded":
        return "Noté";
      case "late":
        return "En retard";
      default:
        return "Inconnu";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return `Retard de ${Math.abs(diffDays)} jour${
        Math.abs(diffDays) > 1 ? "s" : ""
      }`;
    } else if (diffDays === 0) {
      return "Aujourd&apos;hui";
    } else if (diffDays === 1) {
      return "Demain";
    } else {
      return `Dans ${diffDays} jours`;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Facile":
        return "text-green-600 bg-green-100 dark:bg-green-900";
      case "Moyen":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900";
      case "Difficile":
        return "text-red-600 bg-red-100 dark:bg-red-900";
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900";
    }
  };

  const handleSubmitAssignment = (assignmentId: string) => {
    console.log("Submitting assignment:", assignmentId);
    setShowSubmissionModal(true);
  };

  const handleViewDetails = (assignmentId: string) => {
    setSelectedAssignment(
      selectedAssignment === assignmentId ? null : assignmentId
    );
  };

  // Calcul des KPIs gamifiés
  const kpis = [
    {
      label: "Devoirs à rendre",
      value: assignments.filter((a) => a.status === "pending").length,
      icon: <ClipboardList size={28} />,
      color: "warning" as const,
      trend: "2 nouveaux cette semaine",
    },
    {
      label: "Devoirs soumis",
      value: assignments.filter((a) => a.status === "submitted").length,
      icon: <Upload size={28} />,
      color: "info" as const,
      trend: "+1 cette semaine",
    },
    {
      label: "Devoirs notés",
      value: assignments.filter((a) => a.status === "graded").length,
      icon: <CheckCircle size={28} />,
      color: "success" as const,
      trend: "Moyenne 15.2/20",
    },
    {
      label: "En retard",
      value: assignments.filter((a) => a.status === "late").length,
      icon: <AlertCircle size={28} />,
      color: "error" as const,
      trend: "À traiter rapidement",
    },
  ];

  return (
    <DashboardLayout>
      <div className="w-full animate-fade-in flex flex-col gap-8">
        <DashboardBreadcrumbs />

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
              Mes Devoirs
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Gérez vos devoirs et suivez vos progrès
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg">
              <Target size={16} className="text-yellow-600" />
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                125
              </span>
            </div>
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg">
              <Target size={16} className="text-green-600" />
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                850 XP
              </span>
            </div>
          </div>
        </div>

        {/* KPI cards gamifiées */}
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

        {/* Filtres et recherche */}
        <Formik
          initialValues={{ search: searchTerm, status: filterStatus, sort: sortBy }}
          enableReinitialize
          onSubmit={() => {}}
        >
          {() => (
            <div className="bg-white dark:bg-gray-950 rounded-xl border p-6 shadow">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search
                      size={20}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10"
                    />
                    <Input
                      type="text"
                      name="search"
                      placeholder="Rechercher un devoir..."
                      value={searchTerm}
                      onChange={e => {
                        setSearchTerm(e.target.value);
                      }}
                      className="pl-10"
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={val => { setFilterStatus(val); }}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Tous les statuts" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les statuts</SelectItem>
                      <SelectItem value="pending">En attente</SelectItem>
                      <SelectItem value="submitted">Soumis</SelectItem>
                      <SelectItem value="graded">Notés</SelectItem>
                      <SelectItem value="late">En retard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Select value={sortBy} onValueChange={val => { setSortBy(val); }}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Trier par" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dueDate">Date d&apos;échéance</SelectItem>
                      <SelectItem value="title">Titre</SelectItem>
                      <SelectItem value="course">Matière</SelectItem>
                      <SelectItem value="grade">Note</SelectItem>
                    </SelectContent>
                  </Select>
                  <button
                    type="button"
                    onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                    className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                  >
                    {sortOrder === "asc" ? (
                      <SortAsc size={20} />
                    ) : (
                      <SortDesc size={20} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </Formik>

        {/* Liste des devoirs */}
        <div className="space-y-4">
          {filteredAssignments.map((assignment) => (
            <div
              key={assignment.id}
              className="bg-white dark:bg-gray-950 rounded-xl border shadow hover:shadow-lg transition-shadow duration-200"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {assignment.title}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(
                          assignment.status
                        )}`}
                      >
                        {getStatusIcon(assignment.status)}
                        {getStatusText(assignment.status)}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                          assignment.difficulty
                        )}`}
                      >
                        {assignment.difficulty}
                      </span>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      {assignment.course} • {assignment.teacher.name}
                    </p>

                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {assignment.description}
                    </p>

                    <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        <span>{formatDate(assignment.dueDate)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={16} />
                        <span>{assignment.estimatedTime} min estimé</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Target size={16} />
                        <span>{assignment.maxGrade}/20</span>
                      </div>
                      {assignment.grade && (
                        <div className="flex items-center gap-1">
                          <Target size={16} />
                          <span className="font-semibold text-green-600">
                            {assignment.grade}/20
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    {assignment.status === "pending" && (
                      <button
                        onClick={() => handleSubmitAssignment(assignment.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                      >
                        <Upload size={16} />
                        Soumettre
                      </button>
                    )}

                    <button
                      onClick={() => handleViewDetails(assignment.id)}
                      className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                    >
                      <Eye size={20} />
                    </button>
                  </div>
                </div>

                {/* Détails expansibles */}
                {selectedAssignment === assignment.id && (
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Exigences */}
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                          <Target size={16} />
                          Exigences
                        </h4>
                        <ul className="space-y-2">
                          {assignment.requirements.map((req, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                            >
                              <CheckCircle
                                size={16}
                                className="text-green-600 mt-0.5 flex-shrink-0"
                              />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Ressources */}
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                          <FileText size={16} />
                          Ressources
                        </h4>
                        <div className="space-y-2">
                          {assignment.attachments.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-900 rounded-lg"
                            >
                              <div className="flex items-center gap-2">
                                <FileText size={16} className="text-gray-500" />
                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                  {file.name}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-500">
                                  {file.size}
                                </span>
                                <button className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                                  <Download size={16} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Soumission existante */}
                    {assignment.submission && (
                      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
                        <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3 flex items-center gap-2">
                          <Upload size={16} />
                          Soumission
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-blue-700 dark:text-blue-300">
                              Soumis le{" "}
                              {new Date(
                                assignment.submission.submittedAt
                              ).toLocaleDateString()}
                            </span>
                            <span className="text-sm text-blue-700 dark:text-blue-300">
                              {assignment.timeSpent} min
                            </span>
                          </div>
                          {assignment.submission.files.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded border"
                            >
                              <div className="flex items-center gap-2">
                                <FileText size={16} className="text-blue-600" />
                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                  {file.name}
                                </span>
                              </div>
                              <span className="text-xs text-gray-500">
                                {file.size}
                              </span>
                            </div>
                          ))}
                          {assignment.submission.comment && (
                            <div className="mt-2 p-2 bg-white dark:bg-gray-800 rounded border">
                              <p className="text-sm text-gray-700 dark:text-gray-300">
                                &quot;{assignment.submission.comment}&quot;
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Feedback si noté */}
                    {assignment.feedback && (
                      <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg">
                        <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
                          <MessageCircle size={16} />
                          Feedback du professeur
                        </h4>
                        <p className="text-sm text-green-700 dark:text-green-300">
                          {assignment.feedback}
                        </p>
                      </div>
                    )}

                    {/* Récompenses */}
                    <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-3 flex items-center gap-2">
                        <Target size={16} />
                        Récompenses
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-yellow-600">
                            {assignment.xpReward} XP
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            Expérience
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-yellow-600">
                            {assignment.coinsReward} Coins
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            Pièces
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Modal de soumission */}
        {showSubmissionModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-950 rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                <Upload size={20} />
                Soumettre un devoir
              </h3>
              <Formik
                initialValues={{ files: [], comment: "", timeSpent: "" }}
                onSubmit={(values) => {
                  // Mock submission
                  console.log("Devoir soumis", values);
                  setShowSubmissionModal(false);
                }}
              >
                {() => (
                  <Form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                        Fichiers à soumettre
                      </label>
                      <FileDropzone name="files" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                        Commentaire (optionnel)
                      </label>
                      <Field
                        as={Textarea}
                        name="comment"
                        rows={4}
                        placeholder="Ajoutez un commentaire sur votre travail..."
                        className="w-full"
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-gray-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Temps passé estimé
                        </span>
                      </div>
                      <Field
                        as={Input}
                        type="number"
                        min="0"
                        name="timeSpent"
                        className="w-20"
                        placeholder="0"
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        minutes
                      </span>
                    </div>
                    <div className="flex gap-3 mt-6">
                      <Button
                        type="button"
                        variant="secondary"
                        className="flex-1"
                        onClick={() => setShowSubmissionModal(false)}
                      >
                        Annuler
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 flex items-center gap-2"
                      >
                        <Upload size={16} />
                        Soumettre
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
