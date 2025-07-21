"use client";
import { useState } from "react";
import { Search, BookOpen, Clock, Users, Star, Play, Bookmark, BookmarkCheck, TrendingUp, Award, Target } from "lucide-react";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import DashboardBreadcrumbs from "@/components/Dashboard/DashboardBreadcrumbs";
import GamificationPanel from "@/components/Courses/GamificationPanel";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

// Mock data des cours
const courses = [
  {
    id: "1",
    title: "Mathématiques - Niveau Collège",
    description: "Cours complet de mathématiques pour le collège, couvrant l&apos;algèbre, la géométrie et l&apos;arithmétique.",
    teacher: "Prof. Martin",
    level: "Collège",
    subject: "Mathématiques",
    duration: "12 semaines",
    students: 45,
    rating: 4.8,
    enrolled: true,
    progress: 65,
    image: "https://placehold.co/600x400",
    tags: ["Algèbre", "Géométrie", "Arithmétique"],
    difficulty: "Intermédiaire",
    certificate: true,
  },
  {
    id: "2",
    title: "Histoire de France - Révolution",
    description: "Découvrez la période révolutionnaire française avec des analyses détaillées et des documents d&apos;époque.",
    teacher: "Prof. Dubois",
    level: "Lycée",
    subject: "Histoire",
    duration: "8 semaines",
    students: 32,
    rating: 4.6,
    enrolled: false,
    progress: 0,
    image: "https://placehold.co/600x400",
    tags: ["Révolution", "XIXe siècle", "Politique"],
    difficulty: "Avancé",
    certificate: true,
  },
  {
    id: "3",
    title: "Sciences - Biologie Cellulaire",
    description: "Introduction à la biologie cellulaire avec des expériences virtuelles et des animations 3D.",
    teacher: "Prof. Garcia",
    level: "Lycée",
    subject: "Sciences",
    duration: "10 semaines",
    students: 28,
    rating: 4.9,
    enrolled: true,
    progress: 30,
    image: "https://placehold.co/600x400",
    tags: ["Cellules", "ADN", "Métabolisme"],
    difficulty: "Débutant",
    certificate: false,
  },
  {
    id: "4",
    title: "Français - Littérature Moderne",
    description: "Analyse des œuvres littéraires modernes et contemporaines avec des exercices d&apos;écriture.",
    teacher: "Prof. Laurent",
    level: "Lycée",
    subject: "Français",
    duration: "6 semaines",
    students: 38,
    rating: 4.7,
    enrolled: false,
    progress: 0,
    image: "https://placehold.co/600x400",
    tags: ["Littérature", "Écriture", "Analyse"],
    difficulty: "Intermédiaire",
    certificate: true,
  },
  {
    id: "5",
    title: "Anglais - Conversation Avancée",
    description: "Perfectionnez votre anglais oral avec des exercices de conversation et des simulations réelles.",
    teacher: "Prof. Smith",
    level: "Tous niveaux",
    subject: "Anglais",
    duration: "4 semaines",
    students: 52,
    rating: 4.5,
    enrolled: false,
    progress: 0,
    image: "https://placehold.co/600x400",
    tags: ["Conversation", "Prononciation", "Vocabulaire"],
    difficulty: "Avancé",
    certificate: true,
  },
  {
    id: "6",
    title: "Physique - Mécanique Quantique",
    description: "Introduction aux concepts fondamentaux de la mécanique quantique pour les passionnés de sciences.",
    teacher: "Prof. Einstein",
    level: "Université",
    subject: "Physique",
    duration: "16 semaines",
    students: 15,
    rating: 4.9,
    enrolled: false,
    progress: 0,
    image: "https://placehold.co/600x400",
    tags: ["Quantique", "Atomes", "Énergie"],
    difficulty: "Expert",
    certificate: true,
  },
];

// Mock data pour les filtres avec compteurs
const subjects = [
  { value: "Tous", label: "Toutes les matières", count: courses.length },
  { value: "Mathématiques", label: "Mathématiques", count: 1 },
  { value: "Histoire", label: "Histoire", count: 1 },
  { value: "Sciences", label: "Sciences", count: 1 },
  { value: "Français", label: "Français", count: 1 },
  { value: "Anglais", label: "Anglais", count: 1 },
  { value: "Physique", label: "Physique", count: 1 },
];

const levels = [
  { value: "Tous", label: "Tous les niveaux", count: courses.length },
  { value: "Collège", label: "Collège", count: 1 },
  { value: "Lycée", label: "Lycée", count: 3 },
  { value: "Université", label: "Université", count: 1 },
  { value: "Tous niveaux", label: "Tous niveaux", count: 1 },
];

const difficulties = [
  { value: "Tous", label: "Toutes difficultés", count: courses.length },
  { value: "Débutant", label: "Débutant", count: 1 },
  { value: "Intermédiaire", label: "Intermédiaire", count: 2 },
  { value: "Avancé", label: "Avancé", count: 2 },
  { value: "Expert", label: "Expert", count: 1 },
];

// Mock data pour la gamification
const userStats = {
  totalCourses: 6,
  completedCourses: 2,
  currentStreak: 7,
  totalPoints: 345,
  level: 4,
  nextLevelPoints: 100,
  achievements: [
    {
      id: "1",
      title: "Premier Cours",
      description: "Terminez votre premier cours",
      icon: "🎓",
      unlocked: true,
    },
    {
      id: "2",
      title: "Série de 7 jours",
      description: "Connectez-vous 7 jours de suite",
      icon: "🔥",
      unlocked: true,
    },
    {
      id: "3",
      title: "Mathématicien",
      description: "Terminez 3 cours de mathématiques",
      icon: "📐",
      unlocked: false,
      progress: 66,
    },
    {
      id: "4",
      title: "Polyglotte",
      description: "Terminez un cours dans 3 langues différentes",
      icon: "🌍",
      unlocked: false,
      progress: 33,
    },
  ],
  weeklyGoal: {
    target: 5,
    current: 3,
    type: "lessons" as const,
  },
};

function EnrollModal({ open, onClose, onEnroll, courseTitle }: { open: boolean; onClose: () => void; onEnroll: (data: { name: string; email: string }) => void; courseTitle: string }) {
  if (!open) return null;
  const schema = Yup.object().shape({
    name: Yup.string().required("Le nom est requis"),
    email: Yup.string().email("Email invalide").required("L&apos;email est requis"),
  });
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-950 rounded-xl shadow-xl max-w-md w-full animate-fade-in">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">S&apos;inscrire à {courseTitle}</h3>
          <Button type="button" variant="secondary" onClick={onClose} className="p-2">✕</Button>
        </div>
        <Formik
          initialValues={{ name: "", email: "" }}
          validationSchema={schema}
          onSubmit={(values, { resetForm, setSubmitting }) => {
            setSubmitting(true);
            setTimeout(() => {
              onEnroll(values);
              setSubmitting(false);
              resetForm();
              onClose();
            }, 1000);
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Nom</label>
                <Field as={Input} name="name" placeholder="Votre nom" className={errors.name && touched.name ? "border-red-500" : ""} />
                {errors.name && touched.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Email</label>
                <Field as={Input} name="email" type="email" placeholder="Votre email" className={errors.email && touched.email ? "border-red-500" : ""} />
                {errors.email && touched.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              <div className="flex gap-3 pt-4">
                <Button type="button" variant="secondary" className="flex-1" onClick={onClose}>Annuler</Button>
                <Button type="submit" className="flex-1" disabled={isSubmitting}>{isSubmitting ? "Inscription..." : "S&apos;inscrire"}</Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("Tous");
  const [selectedLevel, setSelectedLevel] = useState("Tous");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Tous");
  const [enrollModal, setEnrollModal] = useState<{ open: boolean; courseId: string | null }>({ open: false, courseId: null });

  const handleOpenEnroll = (courseId: string) => setEnrollModal({ open: true, courseId });
  const handleCloseEnroll = () => setEnrollModal({ open: false, courseId: null });
  const handleEnroll = (data: { name: string; email: string }) => {
    // Mock inscription
    console.log("Inscription cours:", enrollModal.courseId, data);
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.teacher.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSubject = selectedSubject === "Tous" || course.subject === selectedSubject;
    const matchesLevel = selectedLevel === "Tous" || course.level === selectedLevel;
    const matchesDifficulty = selectedDifficulty === "Tous" || course.difficulty === selectedDifficulty;
    const matchesEnrolled = course.enrolled;

    return matchesSearch && matchesSubject && matchesLevel && matchesDifficulty && matchesEnrolled;
  });

  const handleBookmark = (courseId: string) => {
    console.log("Bookmarking course:", courseId);
    // Mock API call to bookmark
  };

  return (
    <DashboardLayout>
      <div className="w-full animate-fade-in flex flex-col gap-8">
        {/* Header avec breadcrumbs */}
        <div>
          <DashboardBreadcrumbs />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">
            Catalogue des Cours
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Découvrez et inscrivez-vous aux cours qui vous intéressent
          </p>
        </div>

        {/* Filtres tout en haut */}
        <Formik
          initialValues={{ search: searchTerm, subject: selectedSubject, level: selectedLevel, difficulty: selectedDifficulty }}
          enableReinitialize
          onSubmit={() => {}}
        >
          {({ values, setFieldValue }) => (
            <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
              <Input
                type="text"
                name="search"
                placeholder="Rechercher un cours..."
                value={values.search}
                onChange={e => { setSearchTerm(e.target.value); setFieldValue("search", e.target.value); }}
                className="w-full md:w-64"
              />
              <Select value={values.subject} onValueChange={val => { setSelectedSubject(val); setFieldValue("subject", val); }}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Matière" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map(s => (
                    <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={values.level} onValueChange={val => { setSelectedLevel(val); setFieldValue("level", val); }}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Niveau" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map(l => (
                    <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={values.difficulty} onValueChange={val => { setSelectedDifficulty(val); setFieldValue("difficulty", val); }}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Difficulté" />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map(d => (
                    <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </Formik>

        {/* Layout principal */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Colonne gauche - Gamification */}
          <div className="lg:col-span-1">
            <GamificationPanel userStats={userStats} />
          </div>

          {/* Colonne droite - Grille des cours */}
          <div className="lg:col-span-3">
            {/* Grille des cours */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <div key={course.id} className="bg-white dark:bg-gray-950 rounded-xl border shadow-lg hover:shadow-xl transition-shadow">
                  {/* Image du cours */}
                  <div className="relative">
                    <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-t-xl flex items-center justify-center">
                      <BookOpen size={48} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      {course.certificate && (
                        <div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                          <Award size={12} />
                          Certificat
                        </div>
                      )}
                      <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                        course.difficulty === "Débutant" ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200" :
                        course.difficulty === "Intermédiaire" ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200" :
                        course.difficulty === "Avancé" ? "bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200" :
                        "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                      }`}>
                        <Target size={12} />
                        {course.difficulty}
                      </div>
                    </div>

                    {/* Bouton bookmark */}
                    <button
                      onClick={() => handleBookmark(course.id)}
                      className="absolute top-3 right-3 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      {course.enrolled ? (
                        <BookmarkCheck size={16} className="text-blue-600" />
                      ) : (
                        <Bookmark size={16} className="text-gray-400" />
                      )}
                    </button>

                    {/* Progression si inscrit */}
                    {course.enrolled && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <div className="flex items-center justify-between text-white">
                          <span className="text-sm font-medium">Progression</span>
                          <span className="text-sm">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Contenu du cours */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 line-clamp-2">
                        {course.title}
                      </h3>
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star size={16} fill="currentColor" />
                        <span className="text-sm font-medium">{course.rating}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                      {course.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {course.tags.slice(0, 2).map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                      {course.tags.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs rounded">
                          +{course.tags.length - 2}
                        </span>
                      )}
                    </div>

                    {/* Informations du cours */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Users size={14} />
                        <span>{course.teacher}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Clock size={14} />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <TrendingUp size={14} />
                        <span>{course.students} étudiants</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      {course.enrolled ? (
                        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md transition-colors flex items-center justify-center gap-2">
                          <Play size={16} />
                          Continuer
                        </button>
                      ) : (
                        <Button onClick={() => handleOpenEnroll(course.id)} className="flex-1">
                          <BookOpen size={16} className="mr-2" />
                          S&apos;inscrire
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message si aucun cours trouvé */}
            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <Search size={24} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Aucun cours trouvé
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Essayez de modifier vos critères de recherche
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <EnrollModal
        open={enrollModal.open}
        onClose={handleCloseEnroll}
        onEnroll={handleEnroll}
        courseTitle={courses.find(c => c.id === enrollModal.courseId)?.title || ""}
      />
    </DashboardLayout>
  );
} 