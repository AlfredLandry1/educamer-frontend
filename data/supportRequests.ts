export interface SupportRequest {
  id: string;
  userId: string;
  type: 'chat' | 'tutoring';
  message: string;
  status: 'open' | 'resolved';
  tutorId?: string;
  response?: string;
  createdAt: string;
  resolvedAt?: string;
}
export const supportRequests: SupportRequest[] = [
  // ... données mock
]; 