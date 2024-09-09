import { type PropsWithChildren, type FC } from 'react';
import cls from './WhiteButton.module.scss';

interface FormButtonProps extends PropsWithChildren {
  clickHandler?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const WhiteButton: FC<FormButtonProps> = ({ children, disabled, clickHandler, type }) => {
  return (
    <button type={type || 'button'} disabled={disabled} onClick={clickHandler} className={`${cls.FormButton}`}>
      {children}
    </button>
  );
};
