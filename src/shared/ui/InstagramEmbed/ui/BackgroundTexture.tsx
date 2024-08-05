import cls from './BackgroundTexture.module.scss';
import bkg from '../../../assets/default-bkg.jpg';

export const BackgroundTexture = () => {
  return <img className={cls.backgroundImage} src={bkg} alt="" />;
};
