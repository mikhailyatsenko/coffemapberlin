import bkg from '../../../assets/default-bkg.jpg';
import cls from './BackgroundTexture.module.scss';

export const BackgroundTexture = () => {
  return <img className={cls.backgroundImage} src={bkg} alt="" />;
};
