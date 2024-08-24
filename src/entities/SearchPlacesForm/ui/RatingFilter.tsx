import cls from './RatingFilter.module.scss';

export interface RatingFilterProps {
  isActive: boolean;
}

export const RatingFilter = ({ isActive }: RatingFilterProps) => {
  return (
    isActive && (
      <div className={cls.dropdown}>
        <button className={cls.dropdownBtn} aria-haspopup="menu">
          <span>with rating</span>
          <span className={cls.arrow}></span>
        </button>
        <ul className={cls.dropdownContent} role="menu">
          <li style={{ transitionDelay: '0.1s' }}>
            <a href="#">React</a>
          </li>
          <li style={{ transitionDelay: '0.2s' }}>
            <a href="#">Angular</a>
          </li>
          <li style={{ transitionDelay: '0.3s' }}>
            <a href="#">Vue</a>
          </li>
          <li style={{ transitionDelay: '0.4s' }}>
            <a href="#">Svelte</a>
          </li>
        </ul>
      </div>
    )
  );
};
