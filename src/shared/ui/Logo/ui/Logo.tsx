import logo from '../../../assets/logo.svg';
import cls from './Logo.module.scss';

export const Logo = () => {
  return (
    <div className={cls.Logo}>
      <img src={logo} height="40px" width="auto" alt="logo" />
      <div className={cls.logoText}>
        <div className={cls.primaryText}>Berlin Coffee</div>
        <div className={cls.secondaryText}>specialty coffee map </div>
      </div>
    </div>
  );
};
