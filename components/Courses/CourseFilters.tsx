"use client";
import { useState } from "react";
import { Search, Filter, X, ChevronDown, ChevronUp } from "lucide-react";

interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

interface CourseFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedSubject: string;
  onSubjectChange: (value: string) => void;
  selectedLevel: string;
  onLevelChange: (value: string) => void;
  selectedDifficulty: string;
  onDifficultyChange: (value: string) => void;
  showEnrolledOnly: boolean;
  onEnrolledOnlyChange: (value: boolean) => void;
  subjects: FilterOption[];
  levels: FilterOption[];
  difficulties: FilterOption[];
  totalCourses: number;
  filteredCount: number;
}

export default function CourseFilters({
  searchTerm,
  onSearchChange,
  selectedSubject,
  onSubjectChange,
  selectedLevel,
  onLevelChange,
  selectedDifficulty,
  onDifficultyChange,
  showEnrolledOnly,
  onEnrolledOnlyChange,
  subjects,
  levels,
  difficulties,
  totalCourses,
  filteredCount,
}: CourseFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleFilterChange = (type: string, value: string) => {
    const newFilters = [...activeFilters];
    const filterKey = `${type}:${value}`;
    
    if (value === "Tous") {
      // Remove all filters of this type
      setActiveFilters(newFilters.filter(f => !f.startsWith(`${type}:`)));
    } else {
      // Remove existing filter of this type and add new one
      const filtered = newFilters.filter(f => !f.startsWith(`${type}:`));
      setActiveFilters([...filtered, filterKey]);
    }

    // Update the actual filter
    switch (type) {
      case "subject":
        onSubjectChange(value);
        break;
      case "level":
        onLevelChange(value);
        break;
      case "difficulty":
        onDifficultyChange(value);
        break;
    }
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    onSearchChange("");
    onSubjectChange("Tous");
    onLevelChange("Tous");
    onDifficultyChange("Tous");
    onEnrolledOnlyChange(false);
  };

  const removeFilter = (filterKey: string) => {
    const [type, value] = filterKey.split(":");
    setActiveFilters(activeFilters.filter(f => f !== filterKey));
    
    switch (type) {
      case "subject":
        onSubjectChange("Tous");
        break;
      case "level":
        onLevelChange("Tous");
        break;
      case "difficulty":
        onDifficultyChange("Tous");
        break;
    }
  };

  const hasActiveFilters = activeFilters.length > 0 || searchTerm || showEnrolledOnly;

  return (
    <div className="bg-white dark:bg-gray-950 rounded-xl border p-6 shadow">
      {/* Header avec compteur et bouton d'expansion */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-500" />
            <span className="font-semibold text-gray-900 dark:text-gray-100">Filtres</span>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {filteredCount} sur {totalCourses} cours
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          {isExpanded ? "Réduire" : "Étendre"}
        </button>
      </div>

      {/* Barre de recherche */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Rechercher un cours, un professeur..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        />
      </div>

      {/* Filtres actifs */}
      {hasActiveFilters && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Filtres actifs :</span>
            <button
              onClick={clearAllFilters}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              Tout effacer
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {searchTerm && (
              <div className="flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                <span>Recherche: &quot;{searchTerm}&quot;</span>
                <button
                  onClick={() => onSearchChange("")}
                  className="ml-1 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full p-0.5"
                >
                  <X size={12} />
                </button>
              </div>
            )}
            {showEnrolledOnly && (
              <div className="flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
                <span>Mes cours seulement</span>
                <button
                  onClick={() => onEnrolledOnlyChange(false)}
                  className="ml-1 hover:bg-green-200 dark:hover:bg-green-800 rounded-full p-0.5"
                >
                  <X size={12} />
                </button>
              </div>
            )}
            {activeFilters.map((filterKey) => {
              const [type, value] = filterKey.split(":");
              const getTypeLabel = (t: string) => {
                switch (t) {
                  case "subject": return "Matière";
                  case "level": return "Niveau";
                  case "difficulty": return "Difficulté";
                  default: return t;
                }
              };
              return (
                <div key={filterKey} className="flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-full text-sm">
                  <span>{getTypeLabel(type)}: {value}</span>
                  <button
                    onClick={() => removeFilter(filterKey)}
                    className="ml-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full p-0.5"
                  >
                    <X size={12} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Filtres détaillés */}
      {isExpanded && (
        <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          {/* Filtre par matière */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Matière
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {subjects.map((subject) => (
                <button
                  key={subject.value}
                  onClick={() => handleFilterChange("subject", subject.value)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedSubject === subject.value
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 border border-blue-300 dark:border-blue-700"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 border border-transparent"
                  }`}
                >
                  {subject.label}
                  {subject.count && (
                    <span className="ml-1 text-xs opacity-75">({subject.count})</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Filtre par niveau */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Niveau
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {levels.map((level) => (
                <button
                  key={level.value}
                  onClick={() => handleFilterChange("level", level.value)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedLevel === level.value
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 border border-blue-300 dark:border-blue-700"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 border border-transparent"
                  }`}
                >
                  {level.label}
                  {level.count && (
                    <span className="ml-1 text-xs opacity-75">({level.count})</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Filtre par difficulté */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Difficulté
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {difficulties.map((difficulty) => (
                <button
                  key={difficulty.value}
                  onClick={() => handleFilterChange("difficulty", difficulty.value)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedDifficulty === difficulty.value
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 border border-blue-300 dark:border-blue-700"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 border border-transparent"
                  }`}
                >
                  {difficulty.label}
                  {difficulty.count && (
                    <span className="ml-1 text-xs opacity-75">({difficulty.count})</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Filtre mes cours seulement */}
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showEnrolledOnly}
                onChange={(e) => onEnrolledOnlyChange(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Afficher seulement mes cours inscrits
              </span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
} 