import cls from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={`${cls.NotFoundPage} container`} style={{ textAlign: 'center' }}>
      <h3>Page not found</h3>
    </div>
  );
};
