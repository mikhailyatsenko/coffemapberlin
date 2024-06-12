import { SendContactForm } from 'features/SendContactForm/ui/SendContactForm';
import cls from './ContactsPage.module.scss';

export const ContactsPage = () => {
  return (
    <div className={cls.ContactsPage}>
      <div className={cls.textContainer}>
        <div className={cls.text}>
          <h1>Get in touch!</h1>
        </div>
      </div>
      <SendContactForm />
    </div>
  );
};

export default ContactsPage;
