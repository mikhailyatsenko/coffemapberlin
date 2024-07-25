import { type PropsWithChildren } from 'react';
import cls from './RegularButton.module.scss';

interface RegularButtonProps extends PropsWithChildren {
  clickHandler?: () => void;
  type?: 'submit' | 'reset' | 'button' | undefined;
  disabled?: boolean;
  blank?: boolean;
}

export const RegularButton = ({ clickHandler, type, disabled, blank = false, children }: RegularButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={`${cls.RegularButton} ${blank && cls.blank}`}
      onClick={clickHandler}
      type={type}
    >
      {children}
    </button>
  );
};
