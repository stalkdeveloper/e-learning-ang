export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  accountType: 'platform' | 'system';
  avatar?: string;
  createdAt?: string;  // ISO 8601 string
  isActive: boolean;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
}

// Helper type for user display
export interface UserDisplay {
  fullName: string;  // firstName + lastName
  initials: string;  // First letters of first and last name
}

export function getUserDisplay(user: User): UserDisplay {
  return {
    fullName: `${user.firstName} ${user.lastName}`,
    initials: `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
  };
}

export function isSystemUser(user: User | null): boolean {
  return user?.accountType === 'system';
}

export function isPlatformUser(user: User | null): boolean {
  return user?.accountType === 'platform';
}