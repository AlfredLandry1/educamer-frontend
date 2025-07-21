"use client";
import { useState } from "react";
import { BookOpen, Clock, Users, Star, Play, Award, TrendingUp, CheckCircle, Lock, FileText, Video, Download, ChevronDown, ChevronRight, Trophy, BadgeCheck, ArrowRight } from "lucide-react";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import DashboardBreadcrumbs from "@/components/Dashboard/DashboardBreadcrumbs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

// Mock data du cours détaillé
const course = {
  id: "1",
  slug: "mathematiques-college",
  title: "Mathématiques - Niveau Collège",
  description: "Cours complet de mathématiques pour le collège, couvrant l'algèbre, la géométrie et l'arithmétique. Ce cours est conçu pour renforcer les bases mathématiques et préparer les élèves aux niveaux supérieurs.",
  teacher: {
    name: "Prof. Martin",
    avatar: "/api/placeholder/50/50",
    experience: "15 ans d'expérience",
    rating: 4.8,
    students: 45,
  },
  level: "Collège",
  subject: "Mathématiques",
  duration: "12 semaines",
  totalStudents: 45,
  rating: 4.8,
  enrolled: true,
  progress: 65,
  image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=400&fit=crop",
  tags: ["Algèbre", "Géométrie", "Arithmétique", "Problèmes"],
  difficulty: "Intermédiaire",
  certificate: true,
  xp: 850,
  coins: 120,
  badges: [
    { label: "Série de 7 jours", icon: <TrendingUp size={16} className="text-green-600" />, earned: true },
    { label: "Math Whiz", icon: <Trophy size={16} className="text-yellow-500" />, earned: false },
    { label: "100% Progression", icon: <BadgeCheck size={16} className="text-blue-600" />, earned: false },
  ],
  sections: [
    {
      id: "sec1",
      title: "Algèbre de base",
      description: "Les fondements de l'algèbre.",
      lessons: [
        { id: "l1", title: "Nombres et opérations", completed: true },
        { id: "l2", title: "Équations simples", completed: true },
        { id: "l3", title: "Problèmes d'application", completed: false },
      ],
    },
    {
      id: "sec2",
      title: "Géométrie",
      description: "Figures, aires et volumes.",
      lessons: [
        { id: "l4", title: "Triangles et cercles", completed: false },
        { id: "l5", title: "Aires et périmètres", completed: false },
      ],
    },
  ],
  resources: [
    { id: "r1", type: "pdf", name: "Cours complet.pdf", url: "#" },
    { id: "r2", type: "video", name: "Introduction vidéo", url: "#" },
    { id: "r3", type: "pdf", name: "Exercices corrigés.pdf", url: "#" },
  ],
};

export default function CourseDetailPage() {
  const [expandedSections, setExpandedSections] = useState<string[]>([course.sections[0].id]);
  const [enrolled, setEnrolled] = useState(course.enrolled);
  const [progress, setProgress] = useState(course.progress);

  const toggleSection = (id: string) => {
    setExpandedSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleEnroll = () => {
    setEnrolled(true);
    setProgress(0);
  };

  return (
    <DashboardLayout>
      <div className="w-full animate-fade-in flex flex-col gap-8">
        <DashboardBreadcrumbs />
        {/* Header du cours */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image */}
          <div className="flex-shrink-0 w-full md:w-2/5 rounded-xl overflow-hidden shadow-lg">
            <Image
              src={course.image}
              alt={course.title}
              width={400}
              height={200}
              className="w-full h-56 object-cover"
            />
          </div>
          {/* Infos principales */}
          <div className="flex-1 flex flex-col gap-4 justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {course.title}
              </h1>
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge variant="secondary">{course.subject}</Badge>
                <Badge variant="outline">{course.level}</Badge>
                <Badge variant="outline">{course.difficulty}</Badge>
                {course.certificate && (
                  <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 flex items-center gap-1">
                    <Award size={14} /> Certificat
                  </Badge>
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                {course.description}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-2">
                <Users size={16} /> {course.totalStudents} élèves
                <Clock size={16} /> {course.duration}
                <Star size={16} className="text-yellow-500" /> {course.rating}
              </div>
              <div className="flex items-center gap-3 mt-2">
                <Image
                  src={course.teacher.avatar}
                  alt={course.teacher.name}
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full border"
                />
                <span className="font-medium text-gray-900 dark:text-gray-100">{course.teacher.name}</span>
                <span className="text-xs text-gray-500">{course.teacher.experience}</span>
              </div>
            </div>
            {/* Gamification */}
            <div className="flex flex-wrap gap-4 items-center mt-4">
              <div className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded-lg">
                <TrendingUp size={16} className="text-blue-600" />
                <span className="font-semibold text-blue-900 dark:text-blue-100">{course.xp} XP</span>
              </div>
              <div className="flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900 px-3 py-1 rounded-lg">
                <Award size={16} className="text-yellow-600" />
                <span className="font-semibold text-yellow-900 dark:text-yellow-100">{course.coins} Coins</span>
              </div>
              {course.badges.map((badge, i) => (
                <div key={i} className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${badge.earned ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"}`}>
                  {badge.icon} {badge.label}
                </div>
              ))}
            </div>
            {/* Progression */}
            {enrolled && (
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                  <span>Progression</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
            {/* Bouton d'action */}
            <div className="mt-4">
              {enrolled ? (
                <Button className="w-full flex items-center gap-2" size="lg">
                  <Play size={18} /> Continuer le cours
                </Button>
              ) : (
                <Button className="w-full flex items-center gap-2" size="lg" onClick={handleEnroll}>
                  <ArrowRight size={18} /> S&apos;inscrire à ce cours
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Sections et leçons */}
        <div className="bg-white dark:bg-gray-950 rounded-xl border p-6 shadow">
          <h2 className="text-xl font-bold mb-4 text-primary-700 dark:text-primary-200 flex items-center gap-2">
            <BookOpen size={22} /> Programme du cours
          </h2>
          <div className="divide-y divide-gray-200 dark:divide-gray-800">
            {course.sections.map((section) => (
              <div key={section.id}>
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {expandedSections.includes(section.id) ? (
                      <ChevronDown size={20} className="text-gray-500 transition-transform duration-200" />
                    ) : (
                      <ChevronRight size={20} className="text-gray-500 transition-transform duration-200" />
                    )}
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                        {section.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {section.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm text-gray-500">
                      {section.lessons.length} leçon{section.lessons.length > 1 ? 's' : ''}
                    </div>
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                        {section.lessons.filter(l => l.completed).length}/{section.lessons.length}
                      </span>
                    </div>
                  </div>
                </button>
                {expandedSections.includes(section.id) && (
                  <div className="pl-10 py-2 space-y-2">
                    {section.lessons.map((lesson) => (
                      <div key={lesson.id} className="flex items-center gap-3">
                        {lesson.completed ? (
                          <CheckCircle size={18} className="text-green-500" />
                        ) : (
                          <Lock size={18} className="text-gray-400" />
                        )}
                        <span className={lesson.completed ? "text-green-700 dark:text-green-300" : "text-gray-700 dark:text-gray-300"}>
                          {lesson.title}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Ressources */}
        <div className="bg-white dark:bg-gray-950 rounded-xl border p-6 shadow">
          <h2 className="text-xl font-bold mb-4 text-primary-700 dark:text-primary-200 flex items-center gap-2">
            <FileText size={22} /> Ressources du cours
          </h2>
          <div className="flex flex-col gap-3">
            {course.resources.map((res) => (
              <a
                key={res.id}
                href={res.url}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {res.type === "pdf" ? (
                  <FileText size={20} className="text-red-500" />
                ) : (
                  <Video size={20} className="text-blue-500" />
                )}
                <span className="flex-1 text-gray-900 dark:text-gray-100">{res.name}</span>
                <Download size={18} className="text-gray-400" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 