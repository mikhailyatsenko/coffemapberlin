import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import cls from './ToastMessage.module.scss';

interface ToastProps {
  message?: string;
  theme?: 'default' | 'green';
  // from?: 'top' | 'bottom';
}

const Toast = ({ message, theme = 'default' }: ToastProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);

      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [message]);
  return createPortal(
    <div className={`${cls.ToastMessage} ${cls[theme]} ${isVisible ? cls.show : ''}`} data-testid="toast">
      <div>{message}</div>
    </div>,
    document.body,
  );
};

export default Toast;
