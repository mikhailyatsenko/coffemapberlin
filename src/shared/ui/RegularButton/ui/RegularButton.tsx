import { type PropsWithChildren } from 'react';
import cls from './RegularButton.module.scss';

interface RegularButtonProps extends PropsWithChildren {
  clickHandler?: () => void;
  type?: 'submit' | 'reset' | 'button' | undefined;
  disabled?: boolean;
  theme?: 'blank' | 'error' | 'success';
}

export const RegularButton = ({ clickHandler, type, disabled, theme, children }: RegularButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={`${cls.RegularButton} ${theme ? cls[theme] : ''}`}
      onClick={clickHandler}
      type={type}
    >
      {children}
    </button>
  );
};
