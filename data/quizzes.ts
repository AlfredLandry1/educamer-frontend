export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
}
export interface Quiz {
  id: string;
  courseId: string;
  title: string;
  questions: Question[];
  // autres champs (barème, etc.)
}
export const quizzes: Quiz[] = [
  // ... données mock
]; 