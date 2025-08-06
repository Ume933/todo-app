// types/user.ts
export type UserRole = 'super-admin' | 'admin' | 'user';

export interface User {
  uid: string;
  email: string;
  role: UserRole;
  createdAt: Date;
}