"use client";
import { useState } from "react";
import {
  BookOpen,
  Clock,
  Users,
  Star,
  Play,
  Bookmark,
  BookmarkCheck,
  Award,
  Target,
  CheckCircle,
  Calendar,
  User,
  FileText,
  Video,
  File,
  ChevronRight,
  ChevronDown,
  PlayCircle,
  Heart,
  Share2,
  Flag,
  MessageCircle,
} from "lucide-react";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import DashboardBreadcrumbs from "@/components/Dashboard/DashboardBreadcrumbs";

// Mock data du cours détaillé
const course = {
  id: "1",
  slug: "mathematiques-college",
  title: "Mathématiques - Niveau Collège",
  description:
    "Cours complet de mathématiques pour le collège, couvrant l'algèbre, la géométrie et l'arithmétique. Ce cours est conçu pour renforcer les bases mathématiques et préparer les élèves aux niveaux supérieurs.",
  teacher: {
    name: "Prof. Martin",
    avatar: "/api/placeholder/50/50",
    experience: "15 ans d'expérience",
    rating: 4.8,
    students: 1250,
  },
  level: "Collège",
  subject: "Mathématiques",
  duration: "12 semaines",
  totalStudents: 45,
  rating: 4.8,
  enrolled: true,
  progress: 65,
  image: "/api/placeholder/800/400",
  tags: ["Algèbre", "Géométrie", "Arithmétique", "Problèmes"],
  difficulty: "Intermédiaire",
  certificate: true,
  price: "Gratuit",
  language: "Français",
  lastUpdated: "Il y a 2 semaines",
  sections: [
    {
      id: "1",
      title: "Introduction à l'Algèbre",
      description:
        "Découvrez les bases de l'algèbre et les expressions littérales",
      lessons: [
        {
          id: "1-1",
          title: "Les expressions littérales",
          duration: "45 min",
          type: "video",
          completed: true,
          resources: [
            { name: "Support de cours", type: "pdf", size: "2.3 MB" },
            { name: "Exercices", type: "pdf", size: "1.1 MB" },
          ],
        },
        {
          id: "1-2",
          title: "Simplification d'expressions",
          duration: "60 min",
          type: "video",
          completed: false,
          resources: [
            { name: "Vidéo explicative", type: "video", size: "15.2 MB" },
            { name: "Quiz interactif", type: "quiz", size: "0.5 MB" },
          ],
        },
        {
          id: "1-3",
          title: "Équations du premier degré",
          duration: "75 min",
          type: "interactive",
          completed: false,
          resources: [
            {
              name: "Simulateur d'équations",
              type: "interactive",
              size: "3.7 MB",
            },
          ],
        },
      ],
    },
    {
      id: "2",
      title: "Géométrie Plane",
      description: "Étudiez les figures géométriques et leurs propriétés",
      lessons: [
        {
          id: "2-1",
          title: "Les triangles",
          duration: "50 min",
          type: "video",
          completed: false,
          resources: [
            { name: "Animations 3D", type: "interactive", size: "8.9 MB" },
            { name: "Fiches de révision", type: "pdf", size: "1.8 MB" },
          ],
        },
        {
          id: "2-2",
          title: "Le théorème de Pythagore",
          duration: "65 min",
          type: "video",
          completed: false,
          resources: [
            { name: "Démonstration animée", type: "video", size: "12.1 MB" },
            { name: "Exercices pratiques", type: "pdf", size: "2.4 MB" },
          ],
        },
      ],
    },
    {
      id: "3",
      title: "Arithmétique Avancée",
      description: "Maîtrisez les fractions, pourcentages et proportions",
      lessons: [
        {
          id: "3-1",
          title: "Opérations avec les fractions",
          duration: "55 min",
          type: "interactive",
          completed: false,
          resources: [
            {
              name: "Calculateur de fractions",
              type: "interactive",
              size: "4.2 MB",
            },
          ],
        },
      ],
    },
  ],
  requirements: [
    "Connaissances de base en mathématiques",
    "Calculatrice (optionnelle)",
    "Cahier pour les exercices",
  ],
  objectives: [
    "Maîtriser les expressions littérales",
    "Résoudre des équations du premier degré",
    "Comprendre les propriétés géométriques",
    "Calculer avec les fractions",
  ],
  reviews: [
    {
      id: "1",
      user: "Marie D.",
      rating: 5,
      date: "Il y a 1 semaine",
      comment:
        "Excellent cours ! Les explications sont très claires et les exercices pratiques aident vraiment à comprendre.",
      likes: 12,
      replies: 2,
    },
    {
      id: "2",
      user: "Thomas L.",
      rating: 4,
      date: "Il y a 2 semaines",
      comment:
        "Très bon contenu, mais certains exercices pourraient être plus difficiles pour les élèves avancés.",
      likes: 8,
      replies: 1,
    },
  ],
};

export default function CourseDetailPage() {
  const [enrolled, setEnrolled] = useState(course.enrolled);
  const [bookmarked, setBookmarked] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>(["1"]);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [likedReviews, setLikedReviews] = useState<Set<string>>(new Set());
  const [showAllReviews, setShowAllReviews] = useState(false);

  const handleEnroll = () => {
    console.log("Enrolling in course:", course.id);
    setEnrolled(true);
  };

  const handleBookmark = () => {
    console.log("Bookmarking course:", course.id);
    setBookmarked(!bookmarked);
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleLessonClick = (lessonId: string) => {
    console.log("Starting lesson:", lessonId);
  };

  const handleRatingClick = (rating: number) => {
    setUserRating(rating);
  };

  const handleSubmitComment = () => {
    if (commentText.trim() && userRating > 0) {
      console.log("Submitting comment:", {
        rating: userRating,
        comment: commentText,
      });
      // Ici on ajouterait la logique pour sauvegarder le commentaire
      setCommentText("");
      setUserRating(0);
      setShowCommentForm(false);
    }
  };

  const handleLikeReview = (reviewId: string) => {
    setLikedReviews((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(reviewId)) {
        newSet.delete(reviewId);
      } else {
        newSet.add(reviewId);
      }
      return newSet;
    });
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText size={16} />;
      case "video":
        return <Video size={16} />;
      case "interactive":
        return <PlayCircle size={16} />;
      case "quiz":
        return <Target size={16} />;
      default:
        return <File size={16} />;
    }
  };

  const totalLessons = course.sections.reduce(
    (acc, section) => acc + section.lessons.length,
    0
  );
  const completedLessons = course.sections.reduce(
    (acc, section) =>
      acc + section.lessons.filter((lesson) => lesson.completed).length,
    0
  );

  const displayedReviews = showAllReviews
    ? course.reviews
    : course.reviews.slice(0, 3);

  return (
    <DashboardLayout>
      <DashboardBreadcrumbs />
      <div className="w-full animate-fade-in flex flex-col gap-8">
        {/* Header avec breadcrumbs */}
        <div>
          <DashboardBreadcrumbs />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">
            {course.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {course.description}
          </p>
        </div>

        {/* Layout principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale - Contenu du cours */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Image du cours avec overlay */}
            <div className="relative rounded-xl overflow-hidden group">
              <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center">
                <BookOpen
                  size={80}
                  className="text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                {course.certificate && (
                  <div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 animate-pulse">
                    <Award size={14} />
                    Certificat
                  </div>
                )}
                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${
                    course.difficulty === "Débutant"
                      ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                      : course.difficulty === "Intermédiaire"
                      ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
                      : course.difficulty === "Avancé"
                      ? "bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200"
                      : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                  }`}
                >
                  <Target size={14} />
                  {course.difficulty}
                </div>
              </div>

              {/* Actions */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={handleBookmark}
                  className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-110"
                >
                  {bookmarked ? (
                    <BookmarkCheck size={20} className="text-blue-600" />
                  ) : (
                    <Bookmark size={20} className="text-gray-400" />
                  )}
                </button>
                <button className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-110">
                  <Share2 size={20} className="text-gray-400" />
                </button>
              </div>

              {/* Overlay au hover */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                <button className="opacity-0 group-hover:opacity-100 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2">
                  <Play size={20} />
                  Aperçu du cours
                </button>
              </div>
            </div>

            {/* Sections du cours améliorées */}
            <div className="bg-white dark:bg-gray-950 rounded-xl border p-6 shadow">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  Contenu du cours
                </h2>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <span>{totalLessons} leçons</span>
                  <span>•</span>
                  <span>{course.duration}</span>
                </div>
              </div>
              <div className="space-y-4">
                {course.sections.map((section) => (
                  <div
                    key={section.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {expandedSections.includes(section.id) ? (
                          <ChevronDown
                            size={20}
                            className="text-gray-500 transition-transform duration-200"
                          />
                        ) : (
                          <ChevronRight
                            size={20}
                            className="text-gray-500 transition-transform duration-200"
                          />
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
                          {section.lessons.length} leçon
                          {section.lessons.length > 1 ? "s" : ""}
                        </div>
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                            {section.lessons.filter((l) => l.completed).length}/
                            {section.lessons.length}
                          </span>
                        </div>
                      </div>
                    </button>

                    {expandedSections.includes(section.id) && (
                      <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-3 animate-fade-in">
                        {section.lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
                              lesson.completed
                                ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700"
                                : "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                            }`}
                            onClick={() => handleLessonClick(lesson.id)}
                          >
                            <div className="flex items-center gap-3">
                              {lesson.completed ? (
                                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                                  <CheckCircle
                                    size={16}
                                    className="text-white"
                                  />
                                </div>
                              ) : (
                                <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                                  <PlayCircle
                                    size={16}
                                    className="text-gray-600 dark:text-gray-400"
                                  />
                                </div>
                              )}
                              <div>
                                <h4 className="font-medium text-gray-900 dark:text-gray-100">
                                  {lesson.title}
                                </h4>
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                  <span className="flex items-center gap-1">
                                    <Clock size={14} />
                                    {lesson.duration}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    {getResourceIcon(lesson.type)}
                                    {lesson.type}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {lesson.resources.length > 0 && (
                                <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full">
                                  {lesson.resources.length} ressource
                                  {lesson.resources.length > 1 ? "s" : ""}
                                </span>
                              )}
                              <ChevronRight
                                size={16}
                                className="text-gray-400"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Avis et commentaires améliorés */}
            <div className="bg-white dark:bg-gray-950 rounded-xl border p-6 shadow">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  Avis des participants
                </h2>
                <button
                  onClick={() => setShowCommentForm(!showCommentForm)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                >
                  <MessageCircle size={16} />
                  Ajouter un avis
                </button>
              </div>

              {/* Formulaire d'ajout de commentaire amélioré */}
              {showCommentForm && (
                <div className="mb-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-700 animate-fade-in">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Partagez votre expérience
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Votre note
                      </label>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            className="transition-all duration-200 hover:scale-110"
                            onClick={() => handleRatingClick(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                          >
                            <Star
                              size={24}
                              className={`${
                                star <= (hoverRating || userRating)
                                  ? "text-yellow-500 fill-current"
                                  : "text-gray-300"
                              } transition-colors duration-200`}
                            />
                          </button>
                        ))}
                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                          {userRating > 0 && `${userRating}/5`}
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Votre commentaire
                      </label>
                      <textarea
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all duration-200"
                        rows={4}
                        placeholder="Partagez votre expérience avec ce cours..."
                      />
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">
                          {commentText.length}/500 caractères
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setShowCommentForm(false);
                              setCommentText("");
                              setUserRating(0);
                            }}
                            className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                          >
                            Annuler
                          </button>
                          <button
                            onClick={handleSubmitComment}
                            disabled={!commentText.trim() || userRating === 0}
                            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                          >
                            <FileText size={16} />
                            Publier
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {displayedReviews.map((review) => (
                  <div
                    key={review.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            {review.user.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-gray-100">
                            {review.user}
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={14}
                                  className={
                                    i < review.rating
                                      ? "text-yellow-500 fill-current"
                                      : "text-gray-300"
                                  }
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">
                              {review.date}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleLikeReview(review.id)}
                          className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-colors ${
                            likedReviews.has(review.id)
                              ? "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400"
                              : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                          }`}
                        >
                          <Heart
                            size={14}
                            className={
                              likedReviews.has(review.id) ? "fill-current" : ""
                            }
                          />
                          {review.likes + (likedReviews.has(review.id) ? 1 : 0)}
                        </button>
                        <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                          <MessageCircle size={14} />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                          <Flag size={14} />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                ))}

                {course.reviews.length > 3 && (
                  <div className="text-center pt-4">
                    <button
                      onClick={() => setShowAllReviews(!showAllReviews)}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
                    >
                      {showAllReviews
                        ? "Voir moins"
                        : `Voir tous les ${course.reviews.length} avis`}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Colonne latérale - Informations et actions */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            {/* Carte d'inscription */}
            <div className="bg-white dark:bg-gray-950 rounded-xl border p-6 shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Star size={20} className="text-yellow-500 fill-current" />
                  <span className="text-lg font-bold">{course.rating}</span>
                  <span className="text-sm text-gray-500">
                    ({course.totalStudents} avis)
                  </span>
                </div>
                <span className="text-2xl font-bold text-green-600">
                  {course.price}
                </span>
              </div>

              {enrolled ? (
                <div className="space-y-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle size={20} className="text-blue-600" />
                      <span className="font-semibold text-blue-800 dark:text-blue-200">
                        Vous êtes inscrit
                      </span>
                    </div>
                    <div className="text-sm text-blue-700 dark:text-blue-300">
                      Progression : {completedLessons}/{totalLessons} leçons
                    </div>
                    <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2 mt-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${(completedLessons / totalLessons) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                    <Play size={20} />
                    Continuer le cours
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleEnroll}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <BookOpen size={20} />
                  S&apos;inscrire gratuitement
                </button>
              )}

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Clock size={16} className="text-gray-500" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {course.duration}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Users size={16} className="text-gray-500" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {course.totalStudents} étudiants inscrits
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar size={16} className="text-gray-500" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Mis à jour {course.lastUpdated}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <User size={16} className="text-gray-500" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {course.language}
                  </span>
                </div>
              </div>
            </div>

            {/* Informations sur l'enseignant */}
            <div className="bg-white dark:bg-gray-950 rounded-xl border p-6 shadow">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
                Votre enseignant
              </h3>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User size={24} className="text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-gray-100">
                    {course.teacher.name}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {course.teacher.experience}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i < course.teacher.rating
                          ? "text-yellow-500 fill-current"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {course.teacher.rating}/5
                </span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {course.teacher.students} étudiants formés
              </div>
            </div>

            {/* Prérequis et objectifs */}
            <div className="bg-white dark:bg-gray-950 rounded-xl border p-6 shadow">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
                Prérequis
              </h3>
              <ul className="space-y-2">
                {course.requirements.map((req, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                  >
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-950 rounded-xl border p-6 shadow">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
                Ce que vous apprendrez
              </h3>
              <ul className="space-y-2">
                {course.objectives.map((obj, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                  >
                    <CheckCircle
                      size={16}
                      className="text-green-600 mt-0.5 flex-shrink-0"
                    />
                    {obj}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
