import { SendContactForm } from 'features/SendContactForm/ui/SendContactForm';
import cls from './ContactsPage.module.scss';

export const ContactsPage = () => {
  return (
    <div className={cls.ContactsPage}>
      <div className={cls.textContainer}>
        <div className={cls.contactInfo}>
          <h1>Let&apos;s get in touch!</h1>
          <p className={cls.decription}>We&apos;re open for any suggestion or just to have a chat</p>
        </div>
      </div>
      <SendContactForm />
    </div>
  );
};

export default ContactsPage;
