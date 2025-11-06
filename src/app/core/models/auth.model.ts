import { User } from './user.model';

export interface LoginRequest {
  email: string;
  password: string;
  accountType: 'platform' | 'system';
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: number;
      email: string;
      firstName: string;
      lastName: string;
      accountType: 'platform' | 'system';
    };
    token: string;
    expiresIn: number;
  };
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
}