"use client";
import { useState, useEffect } from "react";
import {
  Search,
  BookOpen,
  Clock,
  Users,
  Star,
  Play,
  Eye,
  Bookmark,
  Share2,
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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

// Mock data pour les cours
interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  level: "débutant" | "intermédiaire" | "avancé";
  category: string;
  duration: string;
  students: number;
  rating: number;
  lessons: number;
  image: string;
  isEnrolled?: boolean;
  progress?: number;
  tags: string[];
}

const mockCourses: Course[] = [
  {
    id: "1",
    title: "Mathématiques - Algèbre Fondamentale",
    description:
      "Apprenez les bases de l&apos;algèbre avec des exercices pratiques et des explications détaillées.",
    instructor: "Prof. Martin Dubois",
    level: "débutant",
    category: "Mathématiques",
    duration: "8 semaines",
    students: 1247,
    rating: 4.8,
    lessons: 24,
    image: "https://placehold.co/600x400",
    isEnrolled: true,
    progress: 65,
    tags: ["algèbre", "équations", "fonctions"],
  },
  {
    id: "2",
    title: "Histoire - Révolution Française",
    description:
      "Découvrez les événements clés de la Révolution Française et leur impact sur le monde moderne.",
    instructor: "Dr. Sophie Laurent",
    level: "intermédiaire",
    category: "Histoire",
    duration: "6 semaines",
    students: 892,
    rating: 4.6,
    lessons: 18,
    image: "https://placehold.co/600x400",
    tags: ["révolution", "1789", "république"],
  },
  {
    id: "3",
    title: "Sciences - Biologie Cellulaire",
    description:
      "Explorez le monde microscopique des cellules et leur fonctionnement complexe.",
    instructor: "Prof. Jean Moreau",
    level: "avancé",
    category: "Sciences",
    duration: "10 semaines",
    students: 567,
    rating: 4.9,
    lessons: 32,
    image: "https://placehold.co/600x400",
    tags: ["cellules", "ADN", "métabolisme"],
  },
  {
    id: "4",
    title: "Littérature - Poésie Moderne",
    description:
      "Analysez les œuvres des plus grands poètes du XXe siècle et leurs techniques d&apos;écriture.",
    instructor: "Dr. Marie Claire",
    level: "intermédiaire",
    category: "Littérature",
    duration: "4 semaines",
    students: 445,
    rating: 4.7,
    lessons: 12,
    image: "https://placehold.co/600x400",
    tags: ["poésie", "modernisme", "symbolisme"],
  },
  {
    id: "5",
    title: "Géographie - Climat et Environnement",
    description:
      "Comprenez les enjeux climatiques actuels et leur impact sur notre planète.",
    instructor: "Prof. Pierre Durand",
    level: "débutant",
    category: "Géographie",
    duration: "5 semaines",
    students: 678,
    rating: 4.5,
    lessons: 15,
    image: "https://placehold.co/600x400",
    tags: ["climat", "environnement", "développement durable"],
  },
  {
    id: "6",
    title: "Physique - Mécanique Quantique",
    description:
      "Plongez dans les mystères de la physique quantique et ses applications modernes.",
    instructor: "Dr. Antoine Bernard",
    level: "avancé",
    category: "Sciences",
    duration: "12 semaines",
    students: 234,
    rating: 4.9,
    lessons: 36,
    image: "https://placehold.co/600x400",
    tags: ["quantique", "atomes", "ondes"],
  },
];

const categories = [
  "Tous",
  "Mathématiques",
  "Histoire",
  "Sciences",
  "Littérature",
  "Géographie",
];
const levels = ["Tous", "débutant", "intermédiaire", "avancé"];

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [selectedLevel, setSelectedLevel] = useState("Tous");
  const [sortBy, setSortBy] = useState("popularité");

  // Filtrage et recherche
  useEffect(() => {
    let filtered = mockCourses;

    // Filtre par recherche
    if (searchTerm) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // Filtre par catégorie
    if (selectedCategory !== "Tous") {
      filtered = filtered.filter(
        (course) => course.category === selectedCategory
      );
    }

    // Filtre par niveau
    if (selectedLevel !== "Tous") {
      filtered = filtered.filter((course) => course.level === selectedLevel);
    }

    // Tri
    switch (sortBy) {
      case "popularité":
        filtered.sort((a, b) => b.students - a.students);
        break;
      case "note":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "durée":
        filtered.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
        break;
      case "récent":
        filtered.sort((a, b) => b.id.localeCompare(a.id));
        break;
    }

    setCourses(filtered);
  }, [searchTerm, selectedCategory, selectedLevel, sortBy]);

  const handleEnroll = (courseId: string) => {
    setCourses((prev) =>
      prev.map((course) =>
        course.id === courseId ? { ...course, isEnrolled: true } : course
      )
    );
  };

  const handleContinue = (courseId: string) => {
    // Navigation vers le cours
    console.log("Continuer le cours:", courseId);
  };

  return (
    <DashboardLayout>
      <div className="w-full animate-fade-in flex flex-col gap-6">
        {/* Header avec breadcrumbs */}
        <div className="flex items-center justify-between">
          <div>
            <DashboardBreadcrumbs />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">
              Catalogue des Cours
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Découvrez nos cours et trouvez celui qui vous convient
            </p>
          </div>
        </div>

        {/* Filtres et recherche */}
        <div className="bg-white dark:bg-gray-950 rounded-xl border p-6 shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Recherche */}
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <Input
                placeholder="Rechercher un cours..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filtre par catégorie */}
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger>
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Filtre par niveau */}
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Niveau" />
              </SelectTrigger>
              <SelectContent>
                {levels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level === "Tous" ? "Tous les niveaux" : level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Tri */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularité">Popularité</SelectItem>
                <SelectItem value="note">Note</SelectItem>
                <SelectItem value="durée">Durée</SelectItem>
                <SelectItem value="récent">Plus récent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-950 rounded-xl border p-4 shadow">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <BookOpen
                  className="text-blue-600 dark:text-blue-400"
                  size={20}
                />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Cours disponibles
                </p>
                <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {courses.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-950 rounded-xl border p-4 shadow">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <Users
                  className="text-green-600 dark:text-green-400"
                  size={20}
                />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Élèves inscrits
                </p>
                <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {mockCourses
                    .reduce((sum, course) => sum + course.students, 0)
                    .toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-950 rounded-xl border p-4 shadow">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                <Star
                  className="text-yellow-600 dark:text-yellow-400"
                  size={20}
                />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Note moyenne
                </p>
                <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {(
                    mockCourses.reduce(
                      (sum, course) => sum + course.rating,
                      0
                    ) / mockCourses.length
                  ).toFixed(1)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-950 rounded-xl border p-4 shadow">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <Clock
                  className="text-purple-600 dark:text-purple-400"
                  size={20}
                />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Heures de contenu
                </p>
                <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {mockCourses.reduce((sum, course) => sum + course.lessons, 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Grille des cours */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white dark:bg-gray-950 rounded-xl border shadow hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
            >
              {/* Image du cours */}
              <div className="relative">
                <Image
                  src={course.image}
                  alt={course.title}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                {course.isEnrolled && (
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-green-600 text-white">Inscrit</Badge>
                  </div>
                )}
                <div className="absolute top-3 right-3 flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
                  >
                    <Bookmark size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
                  >
                    <Share2 size={16} />
                  </Button>
                </div>
              </div>

              {/* Contenu du cours */}
              <div className="p-6">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {course.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Titre et description */}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>

                {/* Informations du cours */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Users size={16} />
                    <span>{course.instructor}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Clock size={16} />
                    <span>
                      {course.duration} • {course.lessons} leçons
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Users size={16} />
                    <span>{course.students.toLocaleString()} élèves</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Star size={16} className="text-yellow-500" />
                    <span>
                      {course.rating} ({course.students} avis)
                    </span>
                  </div>
                </div>

                {/* Niveau */}
                <div className="mb-4">
                  <Badge
                    variant={
                      course.level === "débutant"
                        ? "default"
                        : course.level === "intermédiaire"
                        ? "secondary"
                        : "destructive"
                    }
                    className="text-xs"
                  >
                    {course.level}
                  </Badge>
                </div>

                {/* Progression si inscrit */}
                {course.isEnrolled && course.progress && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                      <span>Progression</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  {course.isEnrolled ? (
                    <Button
                      onClick={() => handleContinue(course.id)}
                      className="flex-1"
                    >
                      <Play size={16} className="mr-2" />
                      Continuer
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleEnroll(course.id)}
                      className="flex-1"
                    >
                      <BookOpen size={16} className="mr-2" />
                      S&apos;inscrire
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    <Eye size={16} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message si aucun cours trouvé */}
        {courses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Aucun cours trouvé
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Essayez de modifier vos critères de recherche
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
