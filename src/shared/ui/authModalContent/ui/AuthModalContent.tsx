import { useState } from 'react';
import cls from './AuthModalContent.module.scss';
import { LoginRequired } from './LoginRequired/LoginRequired';
import { SignInWithEmail } from './SigInWithEmail/ui/SignInWithEmail';
import { SignUpWithEmail } from './SignUpWithEmail/ui/SignUpWithEmail';
import { SuccessfulSignUp } from './SuccessfulSignUp/ui/SuccessfulSignUp';

export interface AuthModalContentProps {
  initialContent: 'LoginRequired' | 'SignUpWithEmail' | 'SignInWithEmail' | 'SuccessfulSignUp';
}

export const AuthModalContent: React.FC<AuthModalContentProps> = ({ initialContent }) => {
  const [currentContent, setCurrentContent] = useState(initialContent);

  const handleSwitchToSignUp = () => {
    setCurrentContent('SignUpWithEmail');
  };

  const handleSwitchToSignIn = () => {
    setCurrentContent('SignInWithEmail');
  };

  const handleSuccessfulSignUp = () => {
    setCurrentContent('SuccessfulSignUp');
  };

  return (
    <div className={cls.authModalContent}>
      {currentContent === 'LoginRequired' && (
        <LoginRequired onSwitchToSignUp={handleSwitchToSignUp} onSwitchToSignIn={handleSwitchToSignIn} />
      )}
      {currentContent === 'SignUpWithEmail' && (
        <SignUpWithEmail onSwitchToSignIn={handleSwitchToSignIn} onSuccessfulSignUp={handleSuccessfulSignUp} />
      )}
      {currentContent === 'SuccessfulSignUp' && <SuccessfulSignUp />}
      {currentContent === 'SignInWithEmail' && <SignInWithEmail onSwitchToSignUp={handleSwitchToSignUp} />}
    </div>
  );
};
