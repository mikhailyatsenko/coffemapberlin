import { useState } from 'react';
import cls from './AuthModalContent.module.scss';
import { LoginRequired } from './LoginRequired/LoginRequired';
import { SignInWithEmail } from './SigInWithEmail/ui/SigInWithEmail';
import { SignUpWithEmail } from './SignUpWithEmail/ui/SignUpWithEmail';

interface AuthModalContentProps {
  initialContent: 'LoginRequired' | 'SignUpWithEmail' | 'SignInWithEmail';
}

export const AuthModalContent: React.FC<AuthModalContentProps> = ({ initialContent }) => {
  const [currentContent, setCurrentContent] = useState(initialContent);

  const handleSwitchToSignUp = () => {
    setCurrentContent('SignUpWithEmail');
  };

  const handleSwitchToSignIn = () => {
    setCurrentContent('SignInWithEmail');
  };

  return (
    <div className={cls.authModalContent}>
      {currentContent === 'LoginRequired' && <LoginRequired onSwitchToSignUp={handleSwitchToSignUp} />}
      {currentContent === 'SignUpWithEmail' && <SignUpWithEmail onSwitchToSignIn={handleSwitchToSignIn} />}
      {currentContent === 'SignInWithEmail' && <SignInWithEmail onSwitchToSignUp={handleSwitchToSignUp} />}
    </div>
  );
};
