import { createContext } from 'react';
import { type User } from 'shared/types';
import { type AuthModalContentProps } from 'shared/ui/authModalContent/ui/AuthModalContent';

interface AuthContextType {
  loading: boolean;
  user: User | null;
  continueWithGoogle: () => void;
  checkAuth: () => void;
  isAuthPopup: AuthModalContentProps['initialContent'] | null;
  setIsAuthPopup: React.Dispatch<React.SetStateAction<AuthModalContentProps['initialContent'] | null>>;
  logout: () => Promise<void>;

  error: Error | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
