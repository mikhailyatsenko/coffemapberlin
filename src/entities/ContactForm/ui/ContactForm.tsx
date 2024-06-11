import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';
import { FormField } from 'shared/ui/FormField';
import ReCAPTCHA from 'react-google-recaptcha';
import { useState } from 'react';

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
    watch,
  } = form;

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaValue(value);
    setValue('recaptcha', value ?? '');
  };

  const recaptcha = watch('recaptcha');

  return (
    <div className="form-container">
      <FormProvider {...form}>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <FormField labelText={'Name'} name="name" type="text" error={errors.name?.message} />
          <FormField labelText={'Email'} name="email" type="email" error={errors.email?.message} />
          <FormField labelText={'Message'} name="message" type="textarea" error={errors.message?.message} />

          <div>
            <ReCAPTCHA sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" onChange={handleCaptchaChange} />
            {errors.recaptcha && <p>{errors.recaptcha.message}</p>}
          </div>

          <FormField name="recaptcha" type="hidden" error={errors.recaptcha?.message} value={captchaValue ?? ''} />

          <button disabled={!captchaValue && !recaptcha} className="submit-button">
            Submit
          </button>
          <p className="disable-button-text">{isValid ? '' : 'all fields are required'}</p>
        </form>
      </FormProvider>
    </div>
  );
};
