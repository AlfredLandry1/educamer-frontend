"use client";
import { useState, useEffect, useRef } from "react";
import {
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Play,
  Pause,
  ArrowLeft,
  ArrowRight,
  Target,
  Trophy,
  BookOpen,
  Lightbulb,
  HelpCircle,
  BarChart3,
  Award,
  TrendingUp,
  CheckSquare,
  Coins,
  Gift,
  Timer,
  Zap,
} from "lucide-react";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import DashboardBreadcrumbs from "@/components/Dashboard/DashboardBreadcrumbs";

// Mock data du quiz avec gamification
const quiz = {
  id: "quiz-1",
  title: "Quiz - Mathématiques Collège",
  description: "Testez vos connaissances en algèbre et géométrie",
  courseSlug: "mathematiques-college",
  duration: 30, // minutes
  totalQuestions: 10,
  passingScore: 70,
  difficulty: "Intermédiaire",
  xpReward: 150,
  coinsReward: 50,
  questions: [
    {
      id: "1",
      question: "Quelle est la solution de l'équation 2x + 5 = 13 ?",
      type: "single",
      options: [
        { id: "a", text: "x = 3", correct: false },
        { id: "b", text: "x = 4", correct: true },
        { id: "c", text: "x = 5", correct: false },
        { id: "d", text: "x = 6", correct: false },
      ],
      explanation:
        "Pour résoudre 2x + 5 = 13, on soustrait 5 des deux côtés : 2x = 8, puis on divise par 2 : x = 4.",
      points: 10,
      difficulty: "Facile",
      timeBonus: 30, // secondes bonus si répondu rapidement
    },
    {
      id: "2",
      question: "Quelles sont les propriétés d'un triangle équilatéral ?",
      type: "multiple",
      options: [
        { id: "a", text: "Trois côtés égaux", correct: true },
        { id: "b", text: "Trois angles égaux", correct: true },
        { id: "c", text: "Un angle droit", correct: false },
        { id: "d", text: "Deux côtés égaux", correct: false },
      ],
      explanation:
        "Un triangle équilatéral a trois côtés égaux et trois angles égaux de 60° chacun.",
      points: 15,
      difficulty: "Moyen",
      timeBonus: 45,
    },
    {
      id: "3",
      question: "Calculez : (3 + 4) × 2 - 5",
      type: "single",
      options: [
        { id: "a", text: "9", correct: true },
        { id: "b", text: "11", correct: false },
        { id: "c", text: "13", correct: false },
        { id: "d", text: "15", correct: false },
      ],
      explanation:
        "On suit l'ordre des opérations : (3 + 4) × 2 - 5 = 7 × 2 - 5 = 14 - 5 = 9",
      points: 10,
      difficulty: "Facile",
      timeBonus: 30,
    },
    {
      id: "4",
      question: "Quelle est la formule de l'aire d'un cercle ?",
      type: "single",
      options: [
        { id: "a", text: "A = π × r", correct: false },
        { id: "b", text: "A = π × r²", correct: true },
        { id: "c", text: "A = 2 × π × r", correct: false },
        { id: "d", text: "A = π × d", correct: false },
      ],
      explanation:
        "L'aire d'un cercle se calcule avec la formule A = π × r² où r est le rayon.",
      points: 10,
      difficulty: "Moyen",
      timeBonus: 40,
    },
    {
      id: "5",
      question: "Quelles fractions sont équivalentes à 1/2 ?",
      type: "multiple",
      options: [
        { id: "a", text: "2/4", correct: true },
        { id: "b", text: "3/6", correct: true },
        { id: "c", text: "4/8", correct: true },
        { id: "d", text: "5/10", correct: true },
      ],
      explanation:
        "Toutes ces fractions sont équivalentes à 1/2 car elles représentent la même valeur.",
      points: 15,
      difficulty: "Difficile",
      timeBonus: 60,
    },
  ],
  powerUps: [
    {
      id: "hint",
      name: "Indice",
      icon: <Lightbulb size={16} />,
      description: "Révèle un indice pour la question",
      cost: 10,
      available: 2,
    },
    {
      id: "time",
      name: "+30s",
      icon: <Clock size={16} />,
      description: "Ajoute 30 secondes au timer",
      cost: 15,
      available: 1,
    },
    {
      id: "skip",
      name: "Passer",
      icon: <ArrowRight size={16} />,
      description: "Passe à la question suivante",
      cost: 25,
      available: 1,
    },
  ],
};

// Mock user data avec gamification
const userStats = {
  level: 8,
  xp: 1250,
  coins: 85,
  streak: 5,
  badges: ["speed_demon", "perfect_score", "first_quiz"],
  totalQuizzes: 12,
  averageScore: 87,
};

export default function QuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [timeLeft, setTimeLeft] = useState(quiz.duration * 60);
  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [coins, setCoins] = useState(userStats.coins);
  const [usedPowerUps, setUsedPowerUps] = useState<Record<string, number>>({});
  const [showPowerUpModal, setShowPowerUpModal] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState<number>(0);
  const [showPerfectAnimation, setShowPerfectAnimation] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const totalAnswered = Object.keys(answers).length;
  const progress = (totalAnswered / quiz.totalQuestions) * 100;

  // Timer effect
  useEffect(() => {
    if (isStarted && !isPaused && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleFinishQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isStarted, isPaused, timeLeft]);

  // Set question start time when question changes
  useEffect(() => {
    if (isStarted) {
      setQuestionStartTime(Date.now());
    }
  }, [currentQuestionIndex, isStarted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleStartQuiz = () => {
    setIsStarted(true);
    setIsPaused(false);
    setQuestionStartTime(Date.now());
  };

  const handlePauseQuiz = () => {
    setIsPaused(!isPaused);
  };

  const handleAnswerSelect = (questionId: string, optionId: string) => {
    setAnswers((prev) => {
      const currentAnswers = prev[questionId] || [];

      if (currentQuestion.type === "single") {
        return { ...prev, [questionId]: [optionId] };
      } else {
        const newAnswers = currentAnswers.includes(optionId)
          ? currentAnswers.filter((id) => id !== optionId)
          : [...currentAnswers, optionId];
        return { ...prev, [questionId]: newAnswers };
      }
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleFinishQuiz = () => {
    setIsStarted(false);
    setIsPaused(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const calculateScore = () => {
    let totalScore = 0;
    let maxScore = 0;
    let bonusXP = 0;
    let bonusCoins = 0;
    let correctAnswers = 0;

    quiz.questions.forEach((question) => {
      maxScore += question.points;
      const userAnswers = answers[question.id] || [];
      const correctOptions = question.options
        .filter((opt) => opt.correct)
        .map((opt) => opt.id);

      let isCorrect = false;
      if (question.type === "single") {
        isCorrect =
          userAnswers.length === 1 && correctOptions.includes(userAnswers[0]);
      } else {
        isCorrect =
          userAnswers.length === correctOptions.length &&
          correctOptions.every((ans) => userAnswers.includes(ans));
      }

      if (isCorrect) {
        totalScore += question.points;
        correctAnswers++;

        // Bonus pour réponse rapide
        const timeSpent = (Date.now() - questionStartTime) / 1000;
        if (timeSpent < question.timeBonus) {
          bonusXP += 5;
          bonusCoins += 2;
        }
      }
    });

    // Bonus streak
    if (correctAnswers >= 3) {
      bonusXP += userStats.streak * 10;
      bonusCoins += userStats.streak * 5;
    }

    // Bonus parfait
    if (correctAnswers === quiz.questions.length) {
      bonusXP += 50;
      bonusCoins += 25;
      setShowPerfectAnimation(true);
      setTimeout(() => setShowPerfectAnimation(false), 3000);
    }

    return {
      score: totalScore,
      maxScore,
      percentage: Math.round((totalScore / maxScore) * 100),
      bonusXP,
      bonusCoins,
      correctAnswers,
    };
  };

  const { score, maxScore, percentage, bonusXP, bonusCoins, correctAnswers } =
    calculateScore();
  const isPassed = percentage >= quiz.passingScore;

  const getQuestionStatus = (questionIndex: number) => {
    const questionId = quiz.questions[questionIndex].id;
    const hasAnswer = answers[questionId] && answers[questionId].length > 0;
    return hasAnswer ? "answered" : "unanswered";
  };

  const handlePowerUpUse = (powerUpId: string) => {
    const powerUp = quiz.powerUps.find((p) => p.id === powerUpId);
    if (
      powerUp &&
      coins >= powerUp.cost &&
      (usedPowerUps[powerUpId] || 0) < powerUp.available
    ) {
      setCoins((prev) => prev - powerUp.cost);
      setUsedPowerUps((prev) => ({
        ...prev,
        [powerUpId]: (prev[powerUpId] || 0) + 1,
      }));

      if (powerUpId === "time") {
        setTimeLeft((prev) => prev + 30);
      } else if (powerUpId === "skip") {
        handleNextQuestion();
      }

      setShowPowerUpModal(false);
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

  if (showResults) {
    return (
      <DashboardLayout>
        <div className="w-full animate-fade-in flex flex-col gap-8">
          <DashboardBreadcrumbs />

          {/* Animation parfaite */}
          {showPerfectAnimation && (
            <div className="fixed inset-0 bg-yellow-400 bg-opacity-20 flex items-center justify-center z-50 animate-pulse">
              <div className="text-center">
                <Trophy size={80} className="text-yellow-500 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-yellow-600">
                  PARFAIT !
                </h2>
                <p className="text-yellow-700">Score parfait !</p>
              </div>
            </div>
          )}

          <div className="max-w-4xl mx-auto w-full">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Résultats du Quiz
              </h1>
              <p className="text-gray-600 dark:text-gray-400">{quiz.title}</p>
            </div>

            {/* Score principal avec gamification */}
            <div className="bg-white dark:bg-gray-950 rounded-xl border p-8 shadow mb-8">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-6 relative">
                  <div className="w-full h-full rounded-full border-8 border-gray-200 dark:border-gray-700 flex items-center justify-center">
                    <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                      {percentage}%
                    </div>
                  </div>
                  <div
                    className="absolute inset-0 rounded-full border-8 border-transparent"
                    style={{
                      background: `conic-gradient(${
                        isPassed ? "#10b981" : "#ef4444"
                      } ${percentage * 3.6}deg, transparent 0deg)`,
                    }}
                  />
                </div>

                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {isPassed ? "Félicitations !" : "Continuez vos efforts"}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Score : {score}/{maxScore} points
                  </p>
                </div>

                {/* Récompenses gamifiées */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Coins size={20} />
                      <span className="font-semibold">+{bonusCoins}</span>
                    </div>
                    <div className="text-sm opacity-90">Pièces gagnées</div>
                  </div>
                  <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-lg p-4 text-white">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <TrendingUp size={20} />
                      <span className="font-semibold">+{bonusXP}</span>
                    </div>
                    <div className="text-sm opacity-90">XP bonus</div>
                  </div>
                  <div className="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg p-4 text-white">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Trophy size={20} />
                      <span className="font-semibold">{userStats.streak}</span>
                    </div>
                    <div className="text-sm opacity-90">Streak actuel</div>
                  </div>
                  <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg p-4 text-white">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Award size={20} />
                      <span className="font-semibold">
                        {correctAnswers}/{quiz.questions.length}
                      </span>
                    </div>
                    <div className="text-sm opacity-90">Réponses correctes</div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-4 mb-6">
                  {isPassed ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <Trophy size={24} />
                      <span className="font-semibold">Quiz réussi !</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-red-600">
                      <AlertCircle size={24} />
                      <span className="font-semibold">À améliorer</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {score}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Points obtenus
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {quiz.passingScore}%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Score minimum
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {formatTime(quiz.duration * 60 - timeLeft)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Temps utilisé
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => setShowResults(false)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <BookOpen size={20} />
                    Voir les détails
                  </button>
                  <button
                    onClick={() => window.history.back()}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <ArrowLeft size={20} />
                    Retour au cours
                  </button>
                </div>
              </div>
            </div>

            {/* Détails des réponses avec gamification */}
            <div className="space-y-6">
              {quiz.questions.map((question, index) => (
                <div
                  key={question.id}
                  className="bg-white dark:bg-gray-950 rounded-xl border p-6 shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                          {index + 1}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                          {question.question}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(
                              question.difficulty
                            )}`}
                          >
                            {question.difficulty}
                          </span>
                          <span className="text-xs text-gray-500">
                            {question.points} points
                          </span>
                        </div>
                      </div>
                    </div>
                    {question.type === "multiple" && (
                      <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full">
                        Multiple
                      </span>
                    )}
                  </div>

                  <div className="space-y-3 mb-4">
                    {question.options.map((option) => {
                      const userAnswers = answers[question.id] || [];
                      const isSelected = userAnswers.includes(option.id);
                      const isCorrect = option.correct;
                      const showCorrect = showResults;

                      let optionClass = "border-gray-200 dark:border-gray-700";
                      if (showCorrect) {
                        if (isCorrect) {
                          optionClass =
                            "border-green-500 bg-green-50 dark:bg-green-900/20";
                        } else if (isSelected && !isCorrect) {
                          optionClass =
                            "border-red-500 bg-red-50 dark:bg-red-900/20";
                        }
                      }

                      return (
                        <div
                          key={option.id}
                          className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${optionClass}`}
                        >
                          <div className="flex items-center gap-2">
                            {question.type === "single" ? (
                              <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center">
                                {isSelected && (
                                  <div className="w-3 h-3 bg-blue-600 rounded-full" />
                                )}
                              </div>
                            ) : (
                              <div className="w-5 h-5 border-2 border-gray-300 rounded flex items-center justify-center">
                                {isSelected && (
                                  <CheckSquare
                                    size={16}
                                    className="text-blue-600"
                                  />
                                )}
                              </div>
                            )}
                            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {option.id.toUpperCase()}.
                            </span>
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">
                            {option.text}
                          </span>
                          {showCorrect && (
                            <div className="ml-auto">
                              {isCorrect ? (
                                <CheckCircle
                                  size={20}
                                  className="text-green-600"
                                />
                              ) : isSelected && !isCorrect ? (
                                <XCircle size={20} className="text-red-600" />
                              ) : null}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {showResults && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb size={16} className="text-blue-600" />
                        <span className="font-semibold text-blue-800 dark:text-blue-200">
                          Explication
                        </span>
                      </div>
                      <p className="text-blue-700 dark:text-blue-300 text-sm">
                        {question.explanation}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!isStarted) {
    return (
      <DashboardLayout>
        <div className="w-full animate-fade-in flex flex-col gap-8">
          <DashboardBreadcrumbs />

          <div className="max-w-2xl mx-auto w-full">
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <Target size={48} className="text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                {quiz.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                {quiz.description}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-950 rounded-xl border p-8 shadow">
              {/* Stats utilisateur */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg text-white">
                  <div className="text-2xl font-bold">{userStats.level}</div>
                  <div className="text-xs opacity-90">Niveau</div>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg text-white">
                  <div className="text-2xl font-bold">{coins}</div>
                  <div className="text-xs opacity-90">Pièces</div>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-lg text-white">
                  <div className="text-2xl font-bold">{userStats.streak}</div>
                  <div className="text-xs opacity-90">Streak</div>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg text-white">
                  <div className="text-2xl font-bold">
                    {userStats.totalQuizzes}
                  </div>
                  <div className="text-xs opacity-90">Quiz passés</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center gap-3">
                  <Clock size={20} className="text-gray-500" />
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-gray-100">
                      Durée
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {quiz.duration} minutes
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <HelpCircle size={20} className="text-gray-500" />
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-gray-100">
                      Questions
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {quiz.totalQuestions} questions
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Award size={20} className="text-gray-500" />
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-gray-100">
                      Score minimum
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {quiz.passingScore}% pour réussir
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <BarChart3 size={20} className="text-gray-500" />
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-gray-100">
                      Points totaux
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {quiz.questions.reduce((acc, q) => acc + q.points, 0)}{" "}
                      points
                    </div>
                  </div>
                </div>
              </div>

              {/* Récompenses potentielles */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4 mb-8">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
                  <Gift size={20} className="text-yellow-600" />
                  Récompenses potentielles
                </h3>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-bold text-yellow-600">
                      {quiz.xpReward} XP
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      Expérience
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-yellow-600">
                      {quiz.coinsReward} Coins
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      Pièces
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-yellow-600">+1 Streak</div>
                    <div className="text-gray-600 dark:text-gray-400">
                      Série
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={handleStartQuiz}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto shadow-lg"
                >
                  <Play size={20} />
                  Commencer le quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="w-full animate-fade-in flex flex-col gap-8">
        <DashboardBreadcrumbs />

        <div className="max-w-4xl mx-auto w-full">
          {/* Header du quiz avec gamification */}
          <div className="bg-white dark:bg-gray-950 rounded-xl border p-6 shadow mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {quiz.title}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Question {currentQuestionIndex + 1} sur {quiz.totalQuestions}
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* Stats utilisateur */}
                <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg">
                  <Coins size={16} className="text-yellow-600" />
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    {coins}
                  </span>
                </div>

                {/* Timer */}
                <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg">
                  <Timer size={20} className="text-gray-600" />
                  <span
                    className={`font-mono font-bold text-lg ${
                      timeLeft < 300
                        ? "text-red-600"
                        : "text-gray-900 dark:text-gray-100"
                    }`}
                  >
                    {formatTime(timeLeft)}
                  </span>
                </div>

                {/* Boutons de contrôle */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowPowerUpModal(true)}
                    className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                    title="Power-ups"
                  >
                    <Zap size={20} />
                  </button>
                  <button
                    onClick={handlePauseQuiz}
                    className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                  >
                    {isPaused ? <Play size={20} /> : <Pause size={20} />}
                  </button>
                  <button
                    onClick={handleFinishQuiz}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                  >
                    Terminer
                  </button>
                </div>
              </div>
            </div>

            {/* Barre de progression avec streak */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Progression
                </span>
                <div className="flex items-center gap-2">
                  {userStats.streak > 0 && (
                    <div className="flex items-center gap-1 text-orange-600">
                      <Trophy size={16} />
                      <span className="text-sm font-semibold">
                        {userStats.streak}
                      </span>
                    </div>
                  )}
                  <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {Math.round(progress)}%
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Question actuelle avec gamification */}
          <div className="bg-white dark:bg-gray-950 rounded-xl border p-8 shadow mb-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold text-white">
                    {currentQuestionIndex + 1}
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {currentQuestion.question}
                  </h2>
                  <div className="flex items-center gap-2 mt-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(
                        currentQuestion.difficulty
                      )}`}
                    >
                      {currentQuestion.difficulty}
                    </span>
                    <span className="text-xs text-gray-500">
                      {currentQuestion.points} points
                    </span>
                    <span className="text-xs text-green-600">
                      +{currentQuestion.timeBonus}s bonus
                    </span>
                  </div>
                </div>
              </div>
              {currentQuestion.type === "multiple" && (
                <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full">
                  Multiple
                </span>
              )}
            </div>

            {/* Options de réponse */}
            <div className="space-y-4">
              {currentQuestion.options.map((option) => {
                const userAnswers = answers[currentQuestion.id] || [];
                const isSelected = userAnswers.includes(option.id);

                return (
                  <button
                    key={option.id}
                    onClick={() =>
                      handleAnswerSelect(currentQuestion.id, option.id)
                    }
                    className={`w-full text-left p-4 rounded-lg border transition-all duration-200 hover:shadow-md hover:scale-[1.02] ${
                      isSelected
                        ? "border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        {currentQuestion.type === "single" ? (
                          <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center">
                            {isSelected && (
                              <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse" />
                            )}
                          </div>
                        ) : (
                          <div className="w-5 h-5 border-2 border-gray-300 rounded flex items-center justify-center">
                            {isSelected && (
                              <CheckSquare
                                size={16}
                                className="text-blue-600 animate-pulse"
                              />
                            )}
                          </div>
                        )}
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {option.id.toUpperCase()}.
                        </span>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">
                        {option.text}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation avec gamification */}
          <div className="flex items-center justify-between">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft size={20} />
              Précédent
            </button>

            <div className="flex items-center gap-2">
              {quiz.questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200 hover:scale-110 ${
                    index === currentQuestionIndex
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : getQuestionStatus(index) === "answered"
                      ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button
              onClick={
                currentQuestionIndex === quiz.questions.length - 1
                  ? handleFinishQuiz
                  : handleNextQuestion
              }
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              {currentQuestionIndex === quiz.questions.length - 1 ? (
                <>
                  Terminer
                  <CheckCircle size={20} />
                </>
              ) : (
                <>
                  Suivant
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Modal Power-ups */}
        {showPowerUpModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-950 rounded-xl p-6 max-w-md w-full mx-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                <Zap size={24} className="text-yellow-600" />
                Power-ups disponibles
              </h3>
              <div className="space-y-3">
                {quiz.powerUps.map((powerUp) => {
                  const used = usedPowerUps[powerUp.id] || 0;
                  const available = powerUp.available - used;
                  const canAfford = coins >= powerUp.cost;

                  return (
                    <button
                      key={powerUp.id}
                      onClick={() => handlePowerUpUse(powerUp.id)}
                      disabled={available === 0 || !canAfford}
                      className={`w-full p-3 rounded-lg border transition-all duration-200 flex items-center justify-between ${
                        canAfford && available > 0
                          ? "border-blue-200 hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                          : "border-gray-200 opacity-50 cursor-not-allowed"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-blue-600">{powerUp.icon}</div>
                        <div className="text-left">
                          <div className="font-semibold text-gray-900 dark:text-gray-100">
                            {powerUp.name}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {powerUp.description}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                          {powerUp.cost} coins
                        </div>
                        <div className="text-xs text-gray-500">
                          {available} restant{available > 1 ? "s" : ""}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setShowPowerUpModal(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
