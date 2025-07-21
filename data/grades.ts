export interface Grade {
  userId: string;
  courseId: string;
  assignmentId: string;
  grade: number;
  feedback?: string;
}
export const grades: Grade[] = [
  // ... données mock
]; 