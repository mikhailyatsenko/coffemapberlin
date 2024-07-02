import cls from './Footer.module.scss';
import { Logo } from 'shared/ui/Logo';

export const Footer = () => {
  return (
    <footer className={cls.Footer}>
      <div className={cls.footerLogo}>
        <Logo />
      </div>
      <div className={cls.copyright}>&copy; {new Date().getFullYear()} Mykhailo Yatsenko</div>
    </footer>
  );
};
