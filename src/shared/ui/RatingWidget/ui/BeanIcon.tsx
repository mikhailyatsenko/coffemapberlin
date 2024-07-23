import cls from './RatingWidget.module.scss';

interface StarIconProps {
  filled: boolean;
  clickable?: boolean;
}
const BeanIcon: React.FC<StarIconProps> = ({ filled, clickable = false }) => (
  <svg
    className={`${filled ? cls.filledStar : cls.emptyStar} ${clickable && cls.clickable}`}
    viewBox="20 20 60 60"
    xmlSpace="preserve"
    preserveAspectRatio="xMidYMid meet"
  >
    <path d="M56.4,48.7c-2,1.8-4.3,3.6-6.6,5c-1.5,1-2.9,1.8-4.4,3c-1.1,0.9-2,1.8-3.2,2.7c-2.7,2.6-5.2,5.6-6.9,8.8   c-2.2,4-3.9,8.4-4.2,13.1c0,0.2,0.1,0.4-0.1,0.5c0.3,0.2,0.3,0.2,0.5,0.3c11.2,6.6,28-1.2,37.7-17.2c8.2-14,8.5-29.5,1.3-37.9   c-1.2,4.5-3.2,8.7-5.8,12.6C62.5,42.9,59.6,46,56.4,48.7z" />
    <path d="M27.6,78.8c1.2-4.5,3.1-8.9,5.6-12.7c2.1-3.3,4.5-6.5,7.2-9.3c1.6-1.7,3.2-3.4,5.1-4.7c1.1-0.9,2.3-1.4,3.5-2.3   c2.5-1.7,5-3.5,7.3-5.8c2.9-2.6,5.5-5.9,7.4-9.4c0.9-1.8,1.7-3.5,2.3-5.6c0.2-0.9,0.5-1.9,0.7-3c0.1-0.5,0.2-1.1,0.1-1.6   c0,0,0.1-0.5,0.1-0.7l-0.3-0.2c-11.2-6.6-28,1.2-37.7,17.2C20.4,54.7,20.4,70.4,27.6,78.8z" />
  </svg>
);

export default BeanIcon;
