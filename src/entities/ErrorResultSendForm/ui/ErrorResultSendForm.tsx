import { RegularButton } from 'shared/ui/RegularButton';
import cls from './ErrorResultSendForm.module.scss';
import errorIcon from '../../../shared/assets/errorIcon.svg';

export const ErrorResultSendForm = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className={cls.ErrorResultSendForm}>
      <div className={cls.icon}>
        <img src={errorIcon} alt="" />
      </div>
      <h3 className={cls.title}>Oops!</h3>
      <p className={cls.text}>Something went wrong while sending your message. Please try again later.</p>
      <RegularButton clickHandler={handleRefresh} theme="error">
        Try again
      </RegularButton>
    </div>
  );
};
