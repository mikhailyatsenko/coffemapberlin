import cls from './FormButton.module.scss';
import { type PropsWithChildren, type FC } from 'react';

interface FormButtonProps extends PropsWithChildren {
  clickHandler?: () => void;
  disabled?: boolean;
}

export const FormButton: FC<FormButtonProps> = ({ children, disabled, clickHandler }) => {
  return (
    <button type="submit" disabled={disabled} onClick={clickHandler} className={`${cls.FormButton}`}>
      {children}
    </button>
  );
};
