import { type PropsWithChildren } from 'react';
import cls from './RegularButton.module.scss';

interface RegularButtonProps extends PropsWithChildren {
  clickHandler?: () => void;
  theme?: string;
}

export const RegularButton = ({ clickHandler, theme, children }: RegularButtonProps) => {
  return (
    <button className={`${cls.RegularButton} ${theme ? cls[theme] : ''}`} onClick={clickHandler}>
      {children}
    </button>
  );
};
