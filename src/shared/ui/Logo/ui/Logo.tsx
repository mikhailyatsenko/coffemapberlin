import logo from '../../../assets/logo.svg';
import cls from './Logo.module.scss';

export const Logo = () => {
  return (
    <div className={cls.Logo}>
      <img src={logo} height="42px" width="auto" alt="logo" />
      <div className={cls.logoText}>
        <div className={cls.primaryText}>3rd Wave Coffee Map</div>
        <div className={cls.secondaryText}>specialty coffe shops in Berlin</div>
      </div>
    </div>
  );
};
