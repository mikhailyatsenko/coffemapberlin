import { RegularButton } from 'shared/ui/RegularButton';
import cls from './ShowErrorSendForm.module.scss';

export const ShowErrorSendForm = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className={cls.ShowErrorSendForm}>
      <h3>Oops!</h3>
      <p>Something went wrong while sending your message. Please try again later.</p>
      <RegularButton clickHandler={handleRefresh} theme="error">
        Try again
      </RegularButton>
    </div>
  );
};
