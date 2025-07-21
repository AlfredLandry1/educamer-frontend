export interface Notification {
  id: string;
  userId: string;
  type: 'assignment' | 'message' | 'quiz' | 'general';
  message: string;
  date: string;
  read: boolean;
}
export const notifications: Notification[] = [
  // ... données mock
]; 