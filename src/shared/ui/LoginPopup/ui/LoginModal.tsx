import { GoogleLoginButton } from 'shared/ui/GoogleLoginButton';
import { PortalToBody } from 'shared/ui/Portals/PortalToBody';
import cls from './LoginModal.module.scss';

interface LoginPopupProps {
  onClose: () => void;
  handleLogin: () => void;
}

export const LoginModal = ({ onClose, handleLogin }: LoginPopupProps) => {
  return (
    <PortalToBody>
      <div className={cls.overlay}>
        <div className={cls.modal}>
          <h2>Login Required</h2>
          <p>You need to be logged in to perform this action.</p>
          <div className={cls.buttons}>
            <GoogleLoginButton buttonHandler={handleLogin} />
            <button className={cls.closeButton} onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </PortalToBody>
  );
};
