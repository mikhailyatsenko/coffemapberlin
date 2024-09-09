import { useAuth } from 'shared/lib/reactContext/Auth/useAuth';
import './GoogleLoginButton.scss';

interface GoogleLoginButtonProps {
  textButton?: string;
}

export const GoogleLoginButton = ({ textButton }: GoogleLoginButtonProps) => {
  const { continueWithGoogle } = useAuth();
  return (
    <button onClick={continueWithGoogle} type="button" className="login-with-google-btn">
      {textButton || 'Sign in'}
    </button>
  );
};
