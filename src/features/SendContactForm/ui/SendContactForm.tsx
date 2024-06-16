import { useState } from 'react';
import { ContactForm, type ContactFormData } from 'entities/ContactForm/ui/ContactForm';
import emailjs from 'emailjs-com';
import { type SubmitHandler } from 'react-hook-form';

import { Loader } from 'shared/ui/Loader';
import { ErrorResultSendForm } from 'entities/ErrorResultSendForm';
import { SuccessResultSendForm } from 'entities/SuccessResultSendForm';

type FormState = 'loading' | 'success' | 'error' | null;

export const SendContactForm = () => {
  const [formState, setFormState] = useState<FormState>(null);

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    // if (!data.recaptcha) {
    //   alert('Please complete the CAPTCHA');
    //   return;
    // }
    setFormState('loading');
    try {
      await emailjs.send(
        'service_8iyv26h',
        'template_ihctmxr',
        data as unknown as Record<string, unknown>,
        '3dF_DSrv-gfgwzoVE',
      );
      setFormState('success');
    } catch (error) {
      console.error('Error sending message:', error);
      setFormState('error');
    }
  };

  if (formState === 'success') {
    return <SuccessResultSendForm />;
  }

  if (formState === 'error') {
    return <ErrorResultSendForm />;
  }

  return (
    <>
      {formState === 'loading' ? <Loader /> : ''}
      <ContactForm onSubmit={onSubmit} />
    </>
  );
};
