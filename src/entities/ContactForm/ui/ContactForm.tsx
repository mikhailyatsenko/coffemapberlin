import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';
import { FormField } from 'shared/ui/FormField';
import ReCAPTCHA from 'react-google-recaptcha';
import { useState } from 'react';
import cls from './ContactForm.module.scss';
import { FormButton } from 'shared/ui/FormButton';

export interface ContactFormData {
  name: string | undefined;
  email: string | undefined;
  message: string | undefined;
  recaptcha: string;
}

interface ContactFormProps {
  onSubmit: SubmitHandler<ContactFormData>;
}

export const ContactForm = ({ onSubmit }: ContactFormProps) => {
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const form = useForm<ContactFormData>({ mode: 'all' });

  const {
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    trigger,
  } = form;

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaValue(value);
    setValue('recaptcha', value ?? '');
    trigger('recaptcha');
  };

  console.log(errors);

  return (
    <div className={cls.ContactForm}>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField labelText={'Name'} fieldName="name" type="text" error={errors.name?.message} />
          <FormField labelText={'Email'} fieldName="email" type="email" error={errors.email?.message} />
          <FormField labelText={'Message'} fieldName="message" error={errors.message?.message} />
          <div className={cls.recaptcha}>
            <ReCAPTCHA sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" onChange={handleCaptchaChange} />
            {errors.recaptcha && <p>Please complete the reCAPTCHA</p>}
          </div>
          <FormField fieldName="recaptcha" type="hidden" error={errors.recaptcha?.message} value={captchaValue ?? ''} />

          <FormButton disabled={!isValid}>Send message</FormButton>
          {/* <div className="disable-button-text">{isValid ? '' : 'all fields are required'}</div> */}
        </form>
      </FormProvider>
    </div>
  );
};
