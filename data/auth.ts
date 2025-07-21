import { User } from './users';

export function loginMock(email: string, password: string): User | null {
  // ... logique mock
  return null;
}
export function registerMock(data: Partial<User>): User {
  // ... logique mock
  return {} as User;
} 