export interface Submission {
  id: string;
  userId: string;
  fileUrl?: string;
  text?: string;
  submittedAt: string;
  status: 'submitted' | 'graded' | 'pending';
  grade?: number;
}
export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  description: string;
  dueDate: string;
  submissions: Submission[];
}
export const assignments: Assignment[] = [
  // ... données mock
]; 