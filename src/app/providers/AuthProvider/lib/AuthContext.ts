import { createContext } from 'react';
import { type User } from 'shared/types';

interface AuthContextType {
  loading: boolean;
  user: User | null;
  login: () => void;

  isLoginPopup: boolean;
  showLoginPopup: () => void;
  closeLoginPopup: () => void;

  logout: () => Promise<void>;

  error: Error | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
