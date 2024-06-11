import { ContactForm, type ContactFormData } from 'entities/ContactForm/ui/ContactForm';
import emailjs from 'emailjs-com';
import { type SubmitHandler } from 'react-hook-form';

export const SendContactForm = () => {
  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    if (!data.recaptcha) {
      alert('Please complete the CAPTCHA');
      return;
    }

    try {
      await emailjs.send(
        'service_8iyv26h',
        'template_ihctmxr',
        data as unknown as Record<string, unknown>,
        '3dF_DSrv-gfgwzoVE',
      );
      alert('Message sent successfully');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('An error occurred');
    }
  };

  return <ContactForm onSubmit={onSubmit} />;
};
