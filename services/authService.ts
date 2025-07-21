import { users, User } from "../data/users";

export function loginMock(email: string, password: string): User | null {
  return users.find((u: User) => u.email === email) || null;
}

export function registerMock(data: Partial<User> & { password: string }): User | null {
  const exists = users.some((u: User) => u.email === data.email);
  if (exists) return null;
  const newUser: User = {
    id: Math.random().toString(36).slice(2),
    role: "student",
    name: data.name || "",
    email: data.email || "",
    avatarUrl: "",
    isEmailVerified: false,
    password: data.password,
  };
  users.push(newUser);
  return newUser;
}

// --- Nouveaux services mockés ---

export function sendVerificationEmailMock(email: string): boolean {
  // Simule l'envoi d'un email de vérification
  return users.some((u: User) => u.email === email);
}

export function verifyEmailMock(email: string): boolean {
  const user = users.find((u: User) => u.email === email);
  if (user) {
    (user as any).isEmailVerified = true;
    return true;
  }
  return false;
}

export function sendResetPasswordEmailMock(email: string): string | null {
  // Simule l'envoi d'un email de reset avec un token
  const user = users.find((u: User) => u.email === email);
  if (!user) return null;
  // On simule un token unique
  const token = Math.random().toString(36).slice(2);
  (user as any).resetToken = token;
  return token;
}

export function validateResetTokenMock(token: string): User | null {
  // Vérifie si le token correspond à un utilisateur
  return users.find((u: User) => (u as any).resetToken === token) || null;
}

export function resetPasswordMock(token: string, newPassword: string): boolean {
  const user = users.find((u: User) => (u as any).resetToken === token);
  if (user) {
    (user as any).password = newPassword;
    delete (user as any).resetToken;
    return true;
  }
  return false;
} 