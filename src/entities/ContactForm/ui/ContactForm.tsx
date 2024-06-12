import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';
import { FormField } from 'shared/ui/FormField';
import ReCAPTCHA from 'react-google-recaptcha';
import { useState } from 'react';
import cls from './ContactForm.module.scss';

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
  const form = useForm<ContactFormData>({ mode: 'onChange' });

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
            <ReCAPTCHA sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" onChange={handleCaptchaChange} />
            {errors.recaptcha && <p>{errors.recaptcha.message}</p>}
          </div>
          <FormField fieldName="recaptcha" type="hidden" error={errors.recaptcha?.message} value={captchaValue ?? ''} />

          <button disabled={!isValid} className={cls.submitbutton}>
            Submit
          </button>
          <p className="disable-button-text">{isValid ? '' : 'all fields are required'}</p>
        </form>
      </FormProvider>
    </div>
  );
};
