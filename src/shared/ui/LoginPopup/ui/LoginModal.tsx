import { useEffect, useState } from 'react';
import { GoogleLoginButton } from 'shared/ui/GoogleLoginButton';
import { PortalToBody } from 'shared/ui/Portals/PortalToBody';
import { RegisterWithEmail } from 'shared/ui/RegisterWithEmail';
import { RegularButton } from 'shared/ui/RegularButton';
import cls from './LoginModal.module.scss';

interface LoginPopupProps {
  onClose: () => void;
  handleLogin: () => void;
}

export const LoginModal = ({ onClose, handleLogin }: LoginPopupProps) => {
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
    <PortalToBody>
      <div className={cls.overlay}>
        <div className={cls.modal}>
          {!showSignUpForm && (
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
                  Sign up with enail
                </RegularButton>
              </div>
            </>
          )}
          {showSignUpForm && <RegisterWithEmail />}
        </div>
      </div>
    </PortalToBody>
  );
};
