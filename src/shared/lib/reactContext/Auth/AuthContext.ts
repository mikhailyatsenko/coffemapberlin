import { createContext } from 'react';
import { type User } from 'shared/types';

interface AuthContextType {
  loading: boolean;
  user: User | null;
  continueWithGoogle: () => void;
  checkAuth: () => void;
  isLoginPopup: boolean;
  setIsLoginPopup: React.Dispatch<React.SetStateAction<boolean>>;
  logout: () => Promise<void>;

  error: Error | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
