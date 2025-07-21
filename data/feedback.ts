export interface Feedback {
  id: string;
  courseId: string;
  userId: string;
  rating: number; // 1 à 5
  comment: string;
  date: string;
}
export const feedbacks: Feedback[] = [
  // ... données mock
]; 