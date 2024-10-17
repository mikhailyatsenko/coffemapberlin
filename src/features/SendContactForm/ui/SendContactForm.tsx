import emailjs from 'emailjs-com';
import { useState } from 'react';
import { type SubmitHandler } from 'react-hook-form';
import { ContactForm, type ContactFormData } from 'entities/ContactForm/ui/ContactForm';

import { ErrorResultSendForm } from 'entities/ErrorResultSendForm';
import { SuccessResultSendForm } from 'entities/SuccessResultSendForm';
import { Loader } from 'shared/ui/Loader';

type FormState = 'loading' | 'success' | 'error' | null;

export const SendContactForm = () => {
  const [formState, setFormState] = useState<FormState>(null);

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
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
