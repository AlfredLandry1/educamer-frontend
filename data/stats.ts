export interface CourseStats {
  courseId: string;
  successRate: number; // %
  avgTime: number; // minutes
  // autres indicateurs
}
export const stats: CourseStats[] = [
  // ... données mock
]; 