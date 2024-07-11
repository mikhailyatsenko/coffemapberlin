import { createContext } from 'react';
import { type User } from 'shared/types';

interface AuthContextType {
  loading: boolean;
  user: User | null;
  login: () => void;
  logout: () => Promise<void>;
  error: Error | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
