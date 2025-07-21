export interface User {
  id: string;
  role: 'student' | 'parent' | 'teacher' | 'admin';
  name: string;
  email: string;
  avatarUrl?: string;
  password?: string;
  isEmailVerified?: boolean;
  resetToken?: string;
  // autres champs selon besoins (ex: enfants pour parent, notifications, etc.)
}
export const users: User[] = [
  {
    id: "1",
    role: "student",
    name: "Alice Dupont",
    email: "alice@example.com",
    avatarUrl: "",
  },
  {
    id: "2",
    role: "teacher",
    name: "M. Martin",
    email: "martin@example.com",
    avatarUrl: "",
  },
  {
    id: "3",
    role: "parent",
    name: "Mme Parent",
    email: "parent@example.com",
    avatarUrl: "",
  },
]; 