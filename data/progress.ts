export interface Progress {
  userId: string;
  courseId: string;
  lessonId: string;
  completed: boolean;
  score?: number;
  date: string;
}
export const progress: Progress[] = [
  // ... données mock
]; 