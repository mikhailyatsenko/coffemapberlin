import { useEffect, useState } from 'react';
import { GoogleLoginButton } from 'shared/ui/GoogleLoginButton';
import { RegularButton } from 'shared/ui/RegularButton';
import cls from './Modal.module.scss';

interface LoginPopupProps {
  onClose: () => void;
  handleLogin: () => void;
}

export const Modal = ({ onClose, handleLogin }: LoginPopupProps) => {
  const [showSignUpForm, setShowSignUpForm] = useState(false);

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [onClose]);

  return (
    <>
      <h2>Login Required</h2>
      <p>You need to be logged in to perform this action.</p>
      <div className={cls.buttons}>
        <GoogleLoginButton textButton="Continue with Google" />
        <RegularButton
          clickHandler={() => {
            setShowSignUpForm(true);
          }}
        >
          Sign up with email
        </RegularButton>
      </div>
    </>
  );
};
