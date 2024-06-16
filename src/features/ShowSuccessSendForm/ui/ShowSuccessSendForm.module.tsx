import { RegularButton } from 'shared/ui/RegularButton';
import cls from './ShowSuccessSendForm.module.scss';
import { Link } from 'react-router-dom';

export const ShowSuccessSendForm = () => {
  return (
    <div className={cls.ShowSuccessSendForm}>
      <h3>Success!</h3>
      <p>Your message has been sent! We will review it shortly.</p>
      <Link to={'/'}>
        <RegularButton theme="success">Home</RegularButton>
      </Link>
    </div>
  );
};
