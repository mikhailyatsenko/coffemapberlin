import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';
import { FormButton } from 'shared/ui/FormButton';
import { FormField } from 'shared/ui/FormField';
import cls from './ContactForm.module.scss';

export interface ContactFormData {
  name: string | undefined;
  email: string | undefined;
  message: string | undefined;
  recaptcha: string | undefined;
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
  return (
    <div className={cls.ContactForm}>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField labelText={'Name'} fieldName="name" type="text" error={errors.name?.message} />
          <FormField labelText={'Email'} fieldName="email" type="email" error={errors.email?.message} />
          <FormField labelText={'Message'} fieldName="message" error={errors.message?.message} />
          <div className={cls.recaptcha}>
            <ReCAPTCHA
              sitekey={
                process.env.VITE_ENV === 'development'
                  ? process.env.RE_CAPTCHA_KEY_DEV!
                  : process.env.RE_CAPTCHA_KEY_PROD!
              }
              onChange={handleCaptchaChange}
            />
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
